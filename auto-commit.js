#!/usr/bin/env node
/**
 * Скрипт для автоматических коммитов изменений
 * Использование: node auto-commit.js "сообщение коммита"
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const commitMessage = process.argv[2] || `Auto commit: ${new Date().toLocaleString('ru-RU')}`;

try {
  // Проверяем, есть ли изменения
  const status = execSync('git status --porcelain', { encoding: 'utf-8' });
  
  if (!status.trim()) {
    console.log('Нет изменений для коммита');
    process.exit(0);
  }

  // Добавляем все изменения
  console.log('Добавление изменений...');
  execSync('git add .', { stdio: 'inherit' });

  // Делаем коммит
  console.log(`Создание коммита: ${commitMessage}`);
  execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });

  // Пушим изменения
  console.log('Отправка изменений в репозиторий...');
  execSync('git push origin main', { stdio: 'inherit' });

  console.log('✅ Изменения успешно закоммичены и отправлены!');
} catch (error) {
  console.error('❌ Ошибка при выполнении автоматического коммита:', error.message);
  process.exit(1);
}

