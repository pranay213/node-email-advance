# mailer-advance

[![npm version](https://img.shields.io/npm/v/mailer-advance.svg)](https://www.npmjs.com/package/mailer-advance)
[![license](https://img.shields.io/npm/l/mailer-advance.svg)](https://www.npmjs.com/package/mailer-advance)

An advanced, production-ready Node.js email service with dynamic SMTP configuration, multi-database support (MongoDB, PostgreSQL, MySQL), and a premium built-in UI.

## 🚀 Features

- **Multi-Database Support**: Seamlessly store SMTP configurations in MongoDB, PostgreSQL, or MySQL.
- **Dynamic SMTP**: Switch SMTP servers at runtime via API or the built-in management UI.
- **Premium UI**: Modern dark-mode interfaces for sending emails, listing configurations, and editing settings.
- **STARTTLS & SSL/TLS**: Full control over secure connections and certificate validation.
- **Rich Emails**: Support for file attachments and embedded images ($cid$ mapping).
- **Developer Friendly**: Exported as a reusable module for any Express/Node.js application.
- **Ultra Lightweight**: Optimized package size (~11KB) with zero build overhead.

## 📦 Installation

```bash
npm install mailer-advance
```

> [!IMPORTANT]
> This package is built using **ES Modules (ESM)**. Ensure your `package.json` includes `"type": "module"` or use the `.mjs` extension.

## 🛠 Usage

### 1. Integration as a Library (Recommended)

Import routes and services directly into your existing Express app. All components are exported as named exports for maximum flexibility.

```javascript
import express from 'express';
import { 
    contactRoutes, 
    configRoutes, 
    mailService, 
    dbService, 
    DatabaseFactory 
} from 'mailer-advance';

const app = express();
app.use(express.json());

// --- Database Initialization (Required for Programmatic Use) ---
const initDB = async () => {
    // 1. Create a repository (mongodb, postgres, or mysql)
    const repository = DatabaseFactory.createRepository(process.env.DB_TYPE || 'mongodb');
    
    // 2. Connect to your database
    await repository.connect(process.env.DB_URI);
    
    // 3. Register it with the shared dbService
    dbService.setRepository(repository);
};

initDB().catch(console.error);

// --- Mounting Routes ---
// These routes handle contact form submissions and SMTP configuration management
app.use('/api/mail', contactRoutes);
app.use('/api/config', configRoutes);

// --- Programmatic Email Sending ---
app.post('/send-custom', async (req, res) => {
    try {
        await mailService.sendEmail({
            to: req.body.to,
            subject: 'Custom Notification',
            text: 'This was sent using the mailService directly!',
            // Optional: configId to use a specific stored SMTP configuration
            // configId: 'my-custom-smtp' 
        });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

### 2. Standalone Service

If you've cloned the repository, you can run it as a standalone server:

```bash
npm install
npm run dev # Starts on http://localhost:3000 (pre-configured to auto-init DB)
```

## ⚙️ Configuration

The service uses Environment Variables for default settings. Create a `.env` file:

```env
PORT=3000

# Database Configuration
DB_TYPE=mongodb # options: mongodb, postgres, mysql
DB_URI=mongodb://localhost:27017/mail_service_db

# Default SMTP Fallback (Internal use and initial setup)
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_SECURE=false
MAIL_USER=your-user
MAIL_PASS=your-password
MAIL_FROM_NAME="System Name"
MAIL_FROM_EMAIL=noreply@example.com
```

## 🖥 Built-in UI

When running the service, visit:
- **`http://localhost:3000/contact.html`**: Send test emails with attachments.
- **`http://localhost:3000/list-configs.html`**: View and manage saved SMTP profiles.
- **`http://localhost:3000/config.html`**: Add or edit SMTP configurations.
- **`http://localhost:3000/api-docs`**: Full OpenApi/Swagger documentation for all endpoints.

## 📄 API Reference

### `POST /api/mail/contact`
Send an email using standard or dynamic config.
- **Body**: `name`, `email`, `to`, `message`, `configId` (optional).
- **Files**: Supports `attachments` (multipart/form-data).

### `GET /api/config`
Returns a JSON list of all stored SMTP configurations.

### `POST /api/config`
Save or update an SMTP configuration profile.

## 📜 License
MIT © Pranay
