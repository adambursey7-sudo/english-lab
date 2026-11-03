# Arranca el servidor de entregas de English Lab escondido (si no responde ya) y abre su puerta al exterior con Tailscale Funnel.
# Uso: servidor\arrancar.ps1            (se puede poner un acceso directo en Inicio para que arranque con Windows)
$raiz = Split-Path -Parent $PSScriptRoot
$vivo = $false
try { $vivo = (Invoke-RestMethod -Uri 'http://127.0.0.1:4180/api/ping' -TimeoutSec 2).ok } catch { }
if (-not $vivo) {
  Start-Process -WindowStyle Hidden -FilePath node -ArgumentList 'servidor/servidor.mjs' -WorkingDirectory $raiz
  Start-Sleep -Seconds 2
}
tailscale funnel --bg --https=10000 4180
Write-Host 'Corregir: http://127.0.0.1:4180/corregir   (la clave está en C:\dev\english-lab-entregas\clave-adam.txt)'
