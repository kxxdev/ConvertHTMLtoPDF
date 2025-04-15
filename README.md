# HTML to PDF Converter API

Микросервис на Node.js + TypeScript, предназначенный для приёма ZIP архива с HTML-файлом, его стилями и изображениями, извлечения и последующей конвертации содержимого в PDF-документ.

## Возможности

- Загружает ZIP-архив, содержащий HTML-файл.
- Поддерживает вложенные директории.
- Извлекает архив, находит HTML-файл.
- Конвертирует HTML в PDF.
- Возвращает PDF пользователю.
- Подробное логирование и автоматическое удаление временных файлов.

## API

Описан в `swagger/swagger.json`.
Документация и работа при запуске доступна по адресу: http://localhost:3000/api-docs/#/default/post_upload

Пример вызова:

**POST** `/upload`  
Формат: `multipart/form-data`  
Параметр: `filedata` — ZIP архив

### Ответы:

- `200` — Успешная конвертация, возвращает PDF
- `400` — Неправильный формат файла или структура архива
- `500` — Внутренняя ошибка сервера

## Установка и запуск локально

```bash
git clone https://github.com/kxxdev/ConvertHTMLtoPDF.git
cd ConvertHTMLtoPDF
npm install
npm run build
npm start
```

## Запуск в Docker

### 1. Соберите образ:

```
docker build -t converthtmltopdf https://github.com/kxxdev/ConvertHTMLtoPDF.git#main
```

### 2. Запустите контейнер:

```
docker run -p 3000:3000 -v "$(pwd)/logs:/app/logs" -v "$(pwd)/uploads:/app/uploads" converthtmltopdf
```

### 3. Теперь сервис доступен по адресу:

http://localhost:3000/upload

## Структура проекта

- `src/routes` — Роуты Express
- `src/middleware` — Middleware, включая валидацию ZIP
- `src/utils` — Утилиты для работы с файлами, логами и HTML
- `src/constants` — Константы
- `src/swagger` — OpenAPI спецификация
- `uploads/` — Временные файлы (автоматически очищаются)
- `logs/` — Файлы логов

## Технологии

- Node.js + Express
- TypeScript
- Puppeteer (для рендеринга HTML в PDF)
- Multer (обработка файлов)
- Winston (логирование)
- Swagger (документация API)
