# Node.js Email Service

A complete Node.js + Express backend for sending emails using Nodemailer with dynamic SMTP fallback support.

## Overview

This service provides a simple API to send emails. It follows a strict fallback logic:
1. Load SMTP configuration from `.env` by default.
2. If dynamic `smtp` configuration is passed in the request body, use it.
3. If no dynamic config is provided, fallback strictly to `.env`.

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure your environment variables in `.env`:
   ```env
   PORT=3000
   MAIL_HOST=smtp.example.com
   MAIL_PORT=587
   MAIL_SECURE=false
   MAIL_USER=your_email@example.com
   MAIL_PASS=your_password
   MAIL_FROM_NAME="Email Service"
   MAIL_FROM_EMAIL=noreply@example.com
   ```

3. Start the server (Production):
   ```bash
   npm start
   ```

4. Start the server (Development with auto-reload):
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

6. Run using Docker:
   ```bash
   docker-compose up --build
   ```

## API Documentation

The API is documented using Swagger. Once the server is running, you can access the documentation at:
`http://localhost:3000/api-docs`

## SMTP Configuration

You can manage SMTP configurations via the API or the UI:
- **UI**: `http://localhost:3000/config.html`
- **API (POST)**: `/api/config`

### POST `/api/contact`

#### Request Body (Multipart/Form-Data)
```text
name: John Doe
email: john@example.com
message: Hello from contact form!
configId: marketing-smtp (ID of SMTP config saved via /api/config)
attachments: [File(s)] (Optional)
```

## Latest Implementation Details
- **Routes**: Added `POST /api/contact` in `src/routes/contact.routes.js` with Swagger JSDoc and `multer` support for file uploads.
- **Documentation**: Integrated Swagger UI reachable at `/api-docs`. The server URL is now dynamically loaded from the `PORT` or `SERVER_URL` in `.env`.
- **Security**: SMTP credentials are now hidden in the API payload by using a `configId` lookup from a mock database service.
- **Features**:
  - **Multi-DB Support**: Use MongoDB, PostgreSQL, or MySQL.
  - **Dynamic SMTP Configuration**: Manage multiple SMTP settings via API and UI.
  - **Premium User Interface**: Dedicated pages for sending emails, adding configurations, and listing saved settings.
  - **TLS & Security**: Explicit control over TLS flags and certificate validation.
  - **Attachments**: Support for sending emails with attachments and embedded images.
  - **Automatic Reloading**: Server restarts automatically when `.env` changes.
- **Build System**: Added `esbuild` for fast bundling and a multistage `Dockerfile` for production-ready containerization.

## Fallback Logic
The `MailService` attempts to resolve the SMTP configuration:
1. If `configId` is provided, it looks up the credentials in the database (Mock DB).
2. If `configId` is not provided or not found, it falls back strictly to the credentials defined in the `.env` file.

## Attachment and Image Support
- **Attachments**: Any file uploaded via the `attachments` field will be sent as a mail attachment.
- **Embedded Images**: Files can be embedded in HTML using the `cid` value (e.g., `<img src="cid:filename.png">`). The service automatically maps uploaded filenames to CIDs.

## Project Structure
- `src/config/`: Configuration loader.
- `src/services/`: Core logic for sending emails.
- `src/routes/`: API endpoints.
- `public/`: Frontend contact form.
# node-email-advance
