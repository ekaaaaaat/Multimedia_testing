# Скрипт для настройки Git hooks на Windows
# Этот скрипт создаст автоматические коммиты и push после изменений

$hooksDir = ".git\hooks"
$postCommitHook = "$hooksDir\post-commit"
$preCommitHook = "$hooksDir\pre-commit"

# Создаем post-commit hook для автоматического push
$postCommitContent = @"
#!/bin/sh
# Автоматический push после коммита
git push origin main
"@

# Создаем pre-commit hook для автоматического добавления изменений
$preCommitContent = @"
#!/bin/sh
# Автоматическое добавление всех изменений перед коммитом
git add -A
"@

# Записываем hooks
[System.IO.File]::WriteAllText($postCommitHook, $postCommitContent)
[System.IO.File]::WriteAllText($preCommitHook, $preCommitContent)

Write-Host "✅ Git hooks настроены!" -ForegroundColor Green
Write-Host "Теперь каждый коммит будет автоматически отправляться в репозиторий" -ForegroundColor Cyan





