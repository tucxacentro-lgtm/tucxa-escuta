param(
  [string]$OutputName = "tucxa-escuta-ajuste-consulente-agendamento.zip"
)

$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$TempDir = Join-Path $ProjectRoot "_tmp_zip_ajuste_consulente_agendamento"
$OutputPath = Join-Path $ProjectRoot $OutputName

if (Test-Path $TempDir) {
  Remove-Item $TempDir -Recurse -Force
}

if (Test-Path $OutputPath) {
  Remove-Item $OutputPath -Force
}

New-Item -ItemType Directory -Path $TempDir | Out-Null

$items = @(
  "src/lib/surveyConfig.ts",
  "src/app/pesquisa/consulente/page.tsx",
  "src/components/SurveyForm.tsx",
  "src/components/QuestionCard.tsx"
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
    Write-Host "Arquivo não encontrado ou opcional: $item" -ForegroundColor Yellow
  }
}

Compress-Archive -Path (Join-Path $TempDir "*") -DestinationPath $OutputPath -Force

Remove-Item $TempDir -Recurse -Force

Write-Host ""
Write-Host "ZIP gerado com sucesso:" -ForegroundColor Green
Write-Host $OutputPath