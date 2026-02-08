# 🚀 mailer-advance v4.0

[![npm version](https://img.shields.io/npm/v/mailer-advance.svg?style=flat-square)](https://www.npmjs.com/package/mailer-advance)
[![license](https://img.shields.io/npm/l/mailer-advance.svg?style=flat-square)](https://www.npmjs.com/package/mailer-advance)
[![Node version](https://img.shields.io/badge/node-%3E%3D20-brightgreen?style=flat-square)](https://nodejs.org)

**mailer-advance** is a high-performance, production-ready Node.js email engine. It provides dynamic SMTP management (hot-swapping), multi-database persistence (MongoDB, PostgreSQL, MySQL), and a premium, glassmorphic built-in UI for system administration.

---

## ✨ Key Features

- 🗄️ **Multi-DB Support**: Store SMTP configurations in MongoDB, Postgres, or MySQL.
- 🔄 **Hot-Swapping**: Switch SMTP servers at runtime via API or Dashboard without restarts.
- 🎨 **Premium UI**: Built-in dark-mode dashboard for sending tests and managing profiles.
- 🛡️ **Robust Security**: Full STARTTLS/SSL/TLS support with certificate pinning/validation.
- 📎 **Rich Emails**: Native support for attachments and CID-mapped inline images.
- 📦 **Zero Overhead**: Optimized ESM-only package (~12KB) designed for high scale.
- 📖 **Swagger Ready**: Auto-generated OpenApi documentation served at `/api-docs`.

---

## 📦 Installation

```bash
npm install mailer-advance
```

> [!IMPORTANT]
> **ESM Only**: This package requires `"type": "module"` in your `package.json`.

---

## 🚀 Quick Start (Library Mode)

Integrate the engine into your Express app.

```javascript
import express from 'express';
import { 
    contactRoutes, 
    configRoutes, 
    dbService, 
    DatabaseFactory 
} from 'mailer-advance';

const app = express();
app.use(express.json());

// 1. Initialize Persistence (Required for UI/Storage)
const repository = DatabaseFactory.createRepository(process.env.DB_TYPE || 'mongodb');
await repository.connect(process.env.DB_URI); // throws Error if URI is missing
dbService.setRepository(repository);

// 2. Mount API & UI Routes
app.use('/api/mail', contactRoutes);
app.use('/api/config', configRoutes);

app.listen(3000, () => {
    console.log('🚀 Mailer engine ready at http://localhost:3000');
});
```

---

## ⚙️ Environment Configuration (.env)

| Variable | Requirement | Description |
|----------|-------------|-------------|
| `DB_TYPE` | Optional | `mongodb`, `postgres`, or `mysql` (Default: `mongodb`) |
| `DB_URI` | **Required** | Connection string for your chosen database. |
| `PORT` | Optional | Port for the standalone server (Default: `3000`). |
| `MAIL_HOST` | Optional | Fallback SMTP Host if no dynamic config is found. |
| `MAIL_PORT` | Optional | Fallback SMTP Port (Default: `587`). |
| `MAIL_SECURE` | Optional | `true` for Port 465, `false` for 587/STARTTLS. |
| `MAIL_USER` | Optional | Fallback SMTP Username. |
| `MAIL_PASS` | Optional | Fallback SMTP Password. |

### 💡 Configuration Hierarchy
1. If a `configId` is passed in an API call, it uses the **Database Stored SMTP**.
2. If no `configId` exists, it falls back to **Environment Variables** (`MAIL_HOST`, etc.).
3. If neither exists, the request will fail.

---

## 🔒 Security Checklist

To ensure your email service is secure in production, verify the following:

- [ ] **Database URI**: Ensure `DB_URI` is stored in a secure `.env` file and never committed to version control.
- [ ] **TLS Validation**: By default, `rejectUnauthorized` is `true`. For development with self-signed certs, set `MAIL_TLS_REJECT_UNAUTHORIZED=false`.
- [ ] **App Privacy**: If you mount the UI (`/contact.html`, etc.), ensure it is behind your own authentication middleware.
- [ ] **Secrets**: Use [Dotenvx](https://dotenvx.com) or similar tools to encrypt your production secrets.

---

## 🛠 Troubleshooting

### `Error: Database connection URI is required`
This error occurs in **v4.0.0+** if you attempt to connect a repository without a valid `DB_URI`.
- **Fix**: Add `DB_URI=mongodb://your-ip:27017/dbname` (or equivalent) to your `.env` file.
- **Why?**: Persistence is mandatory for the management UI and dynamic context swapping.

### SMTP Connection Failures
- Verify `MAIL_PORT` (usually `587` for STARTTLS or `465` for SSL).
- Ensure `MAIL_SECURE` is `true` ONLY for port `465`.

---

## 📜 License

MIT © [Pranay](https://github.com/pranay213)
