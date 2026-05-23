param(
  [string]$OutputName = "tucxa-escuta-ajuste-alerta-pesquisa.zip"
)

$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$TempDir = Join-Path $ProjectRoot "_tmp_zip_ajuste_alerta_pesquisa"
$OutputPath = Join-Path $ProjectRoot $OutputName

if (Test-Path $TempDir) {
  Remove-Item $TempDir -Recurse -Force
}

if (Test-Path $OutputPath) {
  Remove-Item $OutputPath -Force
}

New-Item -ItemType Directory -Path $TempDir | Out-Null

$items = @(
  "src/app/page.tsx",
  "src/app/layout.tsx",
  "src/app/pesquisa/page.tsx",
  "src/app/pesquisa/consulente/page.tsx",
  "src/app/privacidade/page.tsx",
  "src/app/robots.ts",
  "src/app/sitemap.ts",
  "src/app/not-found.tsx",
  "src/app/error.tsx",
  "src/components/SurveyForm.tsx",
  "src/components/QuestionCard.tsx",
  "src/components/ConsulenteShareTools.tsx",
  "src/components/ConsulenteQrPoster.tsx",
  "src/lib/surveyConfig.ts",
  "package.json",
  "package-lock.json",
  ".env.local.example",
  "README.md",
  "next.config.ts",
  "next.config.js",
  "middleware.ts"
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