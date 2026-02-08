# 🚀 mailer-advance v5.0

[![npm version](https://img.shields.io/npm/v/mailer-advance.svg?style=flat-square)](https://www.npmjs.com/package/mailer-advance)
[![license](https://img.shields.io/npm/l/mailer-advance.svg?style=flat-square)](https://www.npmjs.com/package/mailer-advance)
[![Node version](https://img.shields.io/badge/node-%3E%3D20-brightgreen?style=flat-square)](https://nodejs.org)

**mailer-advance** is a high-performance Node.js email engine with absolute flexibility. It features dynamic SMTP hot-swapping, multi-DB persistence, and a premium "management-in-a-box" UI.

---

## ✨ v5.0 Highlights

- ⚡ **Smart Connection**: No need to pass URIs manually. `connect()` now automatically falls back to `process.env.DB_URI`.
- 🗄️ **Multi-DB Persistence**: Store configurations in MongoDB, Postgres, or MySQL.
- 🔄 **Zero-Restart Swapping**: Switch SMTP credentials at runtime via the Dashboard.
- 🛡️ **Production Ready**: Full STARTTLS support and descriptive error guards.
- 📖 **Swagger UI**: API docs auto-served at `/api-docs`.

---

## 📦 Installation

```bash
npm install mailer-advance
```

---

## 🚀 Quick Start (Library Mode)

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

// 1. Initialize Persistence (Smart Fallback to process.env.DB_URI)
const repository = DatabaseFactory.createRepository(process.env.DB_TYPE || 'mongodb');
await repository.connect(); // ✨ Automagically uses DB_URI from .env
dbService.setRepository(repository);

// 2. Mount API Routes
app.use('/api/mail', contactRoutes);
app.use('/api/config', configRoutes);

app.listen(3000, () => console.log('🚀 Engine active at http://localhost:3000'));
```

---

## ⚙️ Environment Configuration (.env)

| Variable | Requirement | Description |
|----------|-------------|-------------|
| `DB_TYPE` | Optional | `mongodb`, `postgres`, or `mysql` (Default: `mongodb`) |
| `DB_URI` | **Required** | Your database connection string. |
| `MAIL_HOST` | Optional | Default SMTP Host (Fallback). |
| `MAIL_PORT` | Optional | Default SMTP Port (Default: `587`). |

### 💡 The .env Setup Guide
For the engine to function correctly as a library, ensure your project's `.env` contains:
```env
# Database
DB_TYPE=mongodb
DB_URI=mongodb://127.0.0.1:27017/my_mailer_db

# Fallback SMTP (Initial Setup)
MAIL_HOST=smtp.your-provider.com
MAIL_PORT=587
MAIL_USER=admin@example.com
MAIL_PASS=your-secure-password
```

---

## 🔒 Security & Best Practices

- **App Privacy**: Always wrap the mailer routes/UI with your own authentication middleware in production.
- **TLS validation**: Ensure `rejectUnauthorized` is `true` for production SMTP connections.
- **Secrets**: Encrypt your `.env` files using tools like [Dotenvx](https://dotenvx.com).

---

## 🛠 Troubleshooting

### `Error: Database connection URI is required`
This occurs if `process.env.DB_URI` is undefined.
1. Ensure your `.env` file exists in the root of your project.
2. Verify you are using `dotenv.config()` BEFORE initializing the mailer.
3. Check the variable name is exactly `DB_URI`.

---

## 📜 License

MIT © [Pranay](https://github.com/pranay213)
