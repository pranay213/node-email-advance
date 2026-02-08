# 🚀 mailer-advance v2.0

[![npm version](https://img.shields.io/npm/v/mailer-advance.svg?style=flat-square)](https://www.npmjs.com/package/mailer-advance)
[![license](https://img.shields.io/npm/l/mailer-advance.svg?style=flat-square)](https://www.npmjs.com/package/mailer-advance)
[![Node version](https://img.shields.io/badge/node-%3E%3D20-brightgreen?style=flat-square)](https://nodejs.org)

**mailer-advance** is a high-performance, production-ready Node.js email engine. It provides dynamic SMTP management, multi-database persistence (MongoDB, PostgreSQL, MySQL), and a premium, glassmorphic built-in UI for administration.

---

## ✨ Features

- 🗄️ **Persistence**: Multi-database support for storing SMTP configs (MongoDB, Postgres, MySQL).
- 🔄 **Hot-Swapping**: Switch SMTP servers at runtime via API or the Admin Dashboard.
- 🎨 **Premium UI**: Built-in dark-mode dashboard for sending tests and managing configs.
- 🔒 **Secure by Design**: Full STARTTLS/SSL/TLS support with configurable certificate validation.
- 📎 **Rich Media**: Support for attachments and inline images ($cid$ mapping).
- 📦 **Zero Overhead**: Ultra-lightweight (~12KB) ESM-only package with minimal dependencies.
- 📖 **Swagger Included**: Auto-generated API documentation for easy integration.

---

## 📦 Installation

```bash
npm install mailer-advance
```

> [!IMPORTANT]
> **ESM Only**: This package requires `"type": "module"` in your `package.json`.

---

## � Quick Start (Library Mode)

Integrate the email engine into your existing Express app in less than 2 minutes.

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

// 1. Initialize Database
const repository = DatabaseFactory.createRepository('mongodb'); // or 'postgres', 'mysql'
await repository.connect(process.env.DB_URI);
dbService.setRepository(repository);

// 2. Mount Routes
app.use('/api/mail', contactRoutes);    // Form submissions
app.use('/api/config', configRoutes);  // SMTP Management

// 3. Access Admin UI (Optional)
// The UI is served relative to your static assets if configured
app.listen(3000, () => {
    console.log('🚀 Mailer engine ready at http://localhost:3000');
    console.log('📖 Documentation: http://localhost:3000/api-docs');
});
```

---

## 🖥 Admin Dashboard

When serving the package, the following tools are available:

- � **Send Test**: `http://localhost:3000/contact.html`
- 📑 **Manage Configs**: `http://localhost:3000/list-configs.html`
- ➕ **Add New**: `http://localhost:3000/config.html`
- 📚 **Swagger Docs**: `http://localhost:3000/api-docs`

---

## ⚙️ Configuration (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `DB_TYPE` | `mongodb`, `postgres`, `mysql` | `mongodb` |
| `DB_URI` | Connection string | - |
| `MAIL_HOST` | Fallback SMTP Host | - |
| `MAIL_PORT` | Fallback SMTP Port | `587` |

---

## 🔄 Migration to v2.0.0

V2 introduces breaking changes to improve library integration:
1. **Named Exports**: All modules now use named exports instead of a single default export.
2. **Relative UI Paths**: The built-in dashboard now uses relative API paths, allowing it to be mounted on any sub-path (e.g., `/admin/mailer/`).
3. **Safety Guards**: `DbService` now throws descriptive errors if used before initialization.

---

## 📜 License

MIT © [Pranay](https://github.com/pranay213)
