param(
  [string]$OutputName = "tucxa-escuta-ajuste-qr-consulentes.zip"
)

$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$TempDir = Join-Path $ProjectRoot "_tmp_zip_qr_consulentes"
$OutputPath = Join-Path $ProjectRoot $OutputName

if (Test-Path $TempDir) {
  Remove-Item $TempDir -Recurse -Force
}

if (Test-Path $OutputPath) {
  Remove-Item $OutputPath -Force
}

New-Item -ItemType Directory -Path $TempDir | Out-Null

$items = @(
  "src/app/pesquisa/page.tsx",
  "src/app/pesquisa/consulente/page.tsx",
  "src/app/admin/pesquisa-tucxa/page.tsx",
  "src/components/SurveyForm.tsx",
  "src/components/AdminDashboard.tsx",
  "src/lib/surveyConfig.ts",
  "package.json"
)

foreach ($item in $items) {
  $source = Join-Path $ProjectRoot $item

  if (Test-Path $source) {
    $destination = Join-Path $TempDir $item
    $destinationDir = Split-Path -Parent $destination

    if (!(Test-Path $destinationDir)) {
      New-Item -ItemType Directory -Path $destinationDir -Force | Out-Null
    }

    Copy-Item $source $destination -Force
  } else {
    Write-Host "Arquivo não encontrado: $item" -ForegroundColor Yellow
  }
}

# Inclui todos os componentes, se existirem, para evitar faltar dependência visual.
$componentsDir = Join-Path $ProjectRoot "src/components"
if (Test-Path $componentsDir) {
  $destinationComponents = Join-Path $TempDir "src/components"
  if (Test-Path $destinationComponents) {
    Remove-Item $destinationComponents -Recurse -Force
  }
  Copy-Item $componentsDir $destinationComponents -Recurse -Force
}

Compress-Archive -Path (Join-Path $TempDir "*") -DestinationPath $OutputPath -Force

Remove-Item $TempDir -Recurse -Force

Write-Host ""
Write-Host "ZIP gerado com sucesso:" -ForegroundColor Green
Write-Host $OutputPath