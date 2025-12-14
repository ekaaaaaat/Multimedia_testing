# PowerShell скрипт для автоматических коммитов на Windows
# Использование: .\auto-commit.ps1 "сообщение коммита"

param(
    [string]$Message = "Auto commit: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
)

try {
    # Проверяем, есть ли изменения
    $status = git status --porcelain
    
    if ([string]::IsNullOrWhiteSpace($status)) {
        Write-Host "Нет изменений для коммита" -ForegroundColor Yellow
        exit 0
    }

    # Добавляем все изменения
    Write-Host "Добавление изменений..." -ForegroundColor Cyan
    git add .

    # Делаем коммит
    Write-Host "Создание коммита: $Message" -ForegroundColor Cyan
    git commit -m $Message

    # Пушим изменения
    Write-Host "Отправка изменений в репозиторий..." -ForegroundColor Cyan
    git push origin main

    Write-Host "✅ Изменения успешно закоммичены и отправлены!" -ForegroundColor Green
} catch {
    Write-Host "❌ Ошибка при выполнении автоматического коммита: $_" -ForegroundColor Red
    exit 1
}





