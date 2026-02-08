# @pranay/mailer-advance

Advanced Node.js email service with dynamic SMTP configuration, multi-database support (MongoDB/PostgreSQL/MySQL), and a built-in UI.

## Features

- **Multi-DB Support**: Store SMTP settings in MongoDB, PostgreSQL, or MySQL.
- **Dynamic Configuration**: Change SMTP servers on-the-fly via API or UI.
- **Built-in UI**: Modern, dark-mode interface for sending emails and managing configurations.
- **Secure**: TLS support with explicit control over certificate validation.
- **Attachments**: Full support for file attachments and embedded images.

## Quick Start

### 1. Installation

```bash
git clone https://github.com/your-repo/mailer-advance
cd mailer-advance
npm install
```

### 2. Environment Setup

Create a `.env` file in the root:

```bash
PORT=3000
DB_TYPE=mongodb # options: mongodb, postgres, mysql
DB_URI=mongodb://localhost:27017/mail_service_db

# Default SMTP (Fallback)
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_SECURE=false
MAIL_USER=user@example.com
MAIL_PASS=password
MAIL_FROM_NAME="Service Name"
MAIL_FROM_EMAIL=noreply@example.com
```

### 3. Run the Service

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## Usage

### User Interface
- **Send Email**: `http://localhost:3000/contact.html`
- **List Configs**: `http://localhost:3000/list-configs.html`
- **Add Config**: `http://localhost:3000/config.html`

### API Headers
Send a `POST` request to `/api/contact` with:
- `configId`: (Optional) ID of a saved SMTP configuration.
- `to`: Recipient email.
- `attachments`: Files (multipart/form-data).

## License
MIT
