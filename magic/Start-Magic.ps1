$ErrorActionPreference = 'Stop'
$sourcePath = Join-Path $PSScriptRoot '_source'
$listener = Get-NetTCPConnection -State Listen -LocalPort 5173 -ErrorAction SilentlyContinue | Select-Object -First 1
if ($listener) {
    $owner = Get-CimInstance Win32_Process -Filter "ProcessId=$($listener.OwningProcess)"
    $viteCommand = [regex]::Match($owner.CommandLine, '"([^"\r\n]+vite[\\/]+bin[\\/]+vite\.js)"')
    $expectedVite = Join-Path $sourcePath 'node_modules\vite\bin\vite.js'
    $belongsToMagic = $owner.Name -eq 'node.exe' -and $viteCommand.Success -and [System.IO.Path]::GetFullPath($viteCommand.Groups[1].Value).Equals($expectedVite, [System.StringComparison]::OrdinalIgnoreCase)
    if ($belongsToMagic) {
        Write-Host 'MAGIC is already running: http://127.0.0.1:5173/'
        return
    }
    throw "Port 5173 is occupied by PID $($listener.OwningProcess). MAGIC keeps its assigned port."
}
if (-not (Test-Path -LiteralPath (Join-Path $sourcePath 'node_modules/vite'))) {
    throw 'Dependencies are missing. Run npm ci in _source first.'
}
Write-Host 'MAGIC: http://127.0.0.1:5173/ (fixed project port)'
Push-Location $sourcePath
try { npm run dev } finally { Pop-Location }
