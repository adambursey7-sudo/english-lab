# Crea un examen NUEVO entero en el PC de Adam: lo escribe con Claude (todas las partes, validadas y resueltas a ciegas),
# graba los audios del listening (C1), compila y deja el cuadernillo y la clave en PDF con el QR del audio.
# Uso: powershell -File scripts/nuevo-examen.ps1 -Examen c1            (siguiente número libre)
#      powershell -File scripts/nuevo-examen.ps1 -Examen pau -Numero 12
# Gasta cuota de Claude (unas 40 llamadas el C1, 8 la PAU). Si alguna parte falla, se puede repetir el mismo comando: salta lo hecho.
# Para que los alumnos lo vean hay que subirlo a master (se publica solo) y entonces el QR ya abre su audio.
param(
  [ValidateSet('c1', 'pau')] [string] $Examen = 'c1',
  [int] $Numero = 0
)
$ErrorActionPreference = 'Stop'
$raiz = Split-Path -Parent $PSScriptRoot
Set-Location $raiz

if ($Numero -eq 0) {
  $usados = @(0)
  foreach ($f in Get-ChildItem -Recurse -Path 'src/banco' -Include *.ts) {
    $dentro = Get-Content $f.FullName -Raw
    $esPau = $f.FullName -match '[\/]pau[\/]'
    if (($Examen -eq 'pau') -eq $esPau) { foreach ($m in [regex]::Matches($dentro, 'examenNumero:\s*(\d+)')) { $usados += [int]$m.Groups[1].Value } }
  }
  foreach ($f in Get-ChildItem 'src/banco/generados' -Filter "examen-$Examen-*.json" -ErrorAction SilentlyContinue) { $usados += [int]($f.BaseName -replace "examen-$Examen-", '') }
  $Numero = ($usados | Measure-Object -Maximum).Maximum + 1
}
Write-Host "== Examen $Examen número $Numero =="

node scripts/examen-completo.mjs $Examen $Numero --paralelo 3
$codigo = $LASTEXITCODE
if ($codigo -ne 0) { Write-Warning "Faltan partes (código $codigo). Repite el comando para que complete las que faltan."; exit $codigo }

if ($Examen -eq 'c1') {
  node scripts/exportar-guiones.mjs
  python scripts/audios.py
}
npm run build
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/pdf.ps1 -Examen $Examen -Numero $Numero
Write-Host "Listo: salida\$Examen-examen-$Numero.pdf y -clave.pdf. Subir a master para publicarlo."
