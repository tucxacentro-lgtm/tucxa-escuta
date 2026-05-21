$required = @(
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "ADMIN_SURVEY_TOKEN"
)

$envFile = ".env.local"

if (!(Test-Path $envFile)) {
  Write-Host "Arquivo .env.local não encontrado." -ForegroundColor Red
  exit 1
}

$content = Get-Content $envFile -Raw
$missing = @()

foreach ($key in $required) {
  if ($content -notmatch "(?m)^$key=.+") {
    $missing += $key
  }
}

if ($missing.Count -gt 0) {
  Write-Host "Variáveis ausentes no .env.local:" -ForegroundColor Red
  $missing | ForEach-Object { Write-Host " - $_" -ForegroundColor Red }
  exit 1
}

Write-Host "Ambiente local aparentemente configurado." -ForegroundColor Green
