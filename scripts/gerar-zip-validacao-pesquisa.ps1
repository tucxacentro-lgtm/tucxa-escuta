param(
  [string]$OutputName = "tucxa-escuta-validacao-pesquisa.zip"
)

$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$TempDir = Join-Path $ProjectRoot "_tmp_zip_validacao_pesquisa"
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
  "src/app/pesquisa/obrigado/page.tsx",
  "src/app/api/pesquisa/submit/route.ts",
  "src/app/admin/pesquisa-tucxa/page.tsx",
  "src/app/api/admin/pesquisa-tucxa/route.ts",
  "src/components/SurveyForm.tsx",
  "src/components/QuestionCard.tsx",
  "src/components/AdminDashboard.tsx",
  "src/lib/surveyConfig.ts",
  "src/lib/supabaseAdmin.ts",
  "supabase/001_create_escuta_tucxa.sql",
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
    Write-Host "Arquivo não encontrado ou opcional: $item" -ForegroundColor Yellow
  }
}

Compress-Archive -Path (Join-Path $TempDir "*") -DestinationPath $OutputPath -Force

Remove-Item $TempDir -Recurse -Force

Write-Host ""
Write-Host "ZIP gerado com sucesso:" -ForegroundColor Green
Write-Host $OutputPath