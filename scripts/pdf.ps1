# Genera el cuadernillo y la clave de un examen en PDF con Chrome sin ventana.
# Uso: powershell -File scripts/pdf.ps1 -Examen c1 -Numero 1   (salida en salida/<examen>-examen-<n>.pdf y -clave.pdf)
# Usa el servidor que haya en marcha (5173 de desarrollo o 4173 de vista previa); si no hay ninguno, arranca la vista previa.
param(
  [ValidateSet('c1', 'pau')] [string] $Examen = 'c1',
  [int] $Numero = 1,
  [string] $Chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
)
$ErrorActionPreference = 'Stop'
$raiz = Split-Path -Parent $PSScriptRoot
$salida = Join-Path $raiz 'salida'
New-Item -ItemType Directory -Force $salida | Out-Null

# Solo vale un servidor que sirva English Lab (otro proyecto de Vite en el 5173 daría un PDF de otra cosa).
function Responde($puerto) {
  try {
    $r = Invoke-WebRequest -Uri "http://localhost:$puerto/" -UseBasicParsing -TimeoutSec 3
    return ($r.StatusCode -eq 200) -and ($r.Content -match '<title>English Lab</title>')
  } catch { return $false }
}
$puerto = $null
$previa = $null
foreach ($p in 5173, 4173) { if (Responde $p) { $puerto = $p; break } }
if (-not $puerto) {
  Write-Host 'No hay servidor: arranco la vista previa en el 4173 (hace falta haber compilado con npm run build, no build:pages).'
  $previa = Start-Process -FilePath 'cmd.exe' -ArgumentList '/c', 'npx vite preview --host 127.0.0.1 --port 4173 --strictPort' -WorkingDirectory $raiz -WindowStyle Hidden -PassThru
  for ($i = 0; $i -lt 20 -and -not (Responde 4173); $i++) { Start-Sleep -Seconds 1 }
  if (-not (Responde 4173)) { throw 'La vista previa no ha arrancado (¿está compilada la app con npm run build?).' }
  $puerto = 4173
}

$perfil = Join-Path $env:TEMP 'english-lab-pdf-chrome'
foreach ($modo in @(@{ sufijo = ''; ruta = '' }, @{ sufijo = '-clave'; ruta = '/clave' })) {
  $url = "http://localhost:$puerto/#/imprimir/$Examen/$Numero$($modo.ruta)"
  $pdf = Join-Path $salida "$Examen-examen-$Numero$($modo.sufijo).pdf"
  if (Test-Path $pdf) { Remove-Item $pdf -Force }
  & $Chrome --headless=new --disable-gpu --no-first-run --user-data-dir="$perfil" --no-pdf-header-footer --virtual-time-budget=10000 --run-all-compositor-stages-before-draw --print-to-pdf="$pdf" $url | Out-Null
  if (-not (Test-Path $pdf)) { Write-Warning "No ha salido $pdf"; continue }
  $kb = [math]::Round((Get-Item $pdf).Length / 1KB)
  if ($kb -lt 40) { Write-Warning "$pdf solo pesa $kb KB: seguramente el examen $Numero de $Examen no existe en el banco." }
  else { Write-Host "Hecho: $pdf ($kb KB)" }
}

# Si la vista previa la arrancó este script, se apaga al terminar (es cmd.exe con npx dentro: se cierra el árbol).
if ($previa) {
  Get-CimInstance Win32_Process -Filter "ParentProcessId = $($previa.Id)" | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
  Stop-Process -Id $previa.Id -Force -ErrorAction SilentlyContinue
}
