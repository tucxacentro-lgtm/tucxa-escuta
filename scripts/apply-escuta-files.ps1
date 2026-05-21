param(
  [string]$ProjectPath = "."
)

$ErrorActionPreference = "Stop"

$resolvedProjectPath = Resolve-Path $ProjectPath
$sourceRoot = Split-Path -Parent $PSScriptRoot
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupDir = Join-Path $resolvedProjectPath "_backup_escuta_tucxa_$timestamp"

Write-Host "Projeto: $resolvedProjectPath" -ForegroundColor Cyan
Write-Host "Criando backup em: $backupDir" -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path $backupDir | Out-Null

$itemsToCopy = @("src", "supabase")

foreach ($item in $itemsToCopy) {
  $target = Join-Path $resolvedProjectPath $item
  if (Test-Path $target) {
    Copy-Item $target $backupDir -Recurse -Force
  }
}

Copy-Item (Join-Path $sourceRoot "src") $resolvedProjectPath -Recurse -Force
Copy-Item (Join-Path $sourceRoot "supabase") $resolvedProjectPath -Recurse -Force

Write-Host "Arquivos copiados com sucesso." -ForegroundColor Green
Write-Host "Agora execute:" -ForegroundColor Yellow
Write-Host "npm install @supabase/supabase-js zod" -ForegroundColor Yellow
Write-Host "npm run lint" -ForegroundColor Yellow
Write-Host "npm run build" -ForegroundColor Yellow
