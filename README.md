# 🚀 mailer-advance v10.0

[![npm version](https://img.shields.io/npm/v/mailer-advance.svg?style=flat-square)](https://www.npmjs.com/package/mailer-advance)
[![license](https://img.shields.io/npm/l/mailer-advance.svg?style=flat-square)](https://www.npmjs.com/package/mailer-advance)
[![Node version](https://img.shields.io/badge/node-%3E%3D20-brightgreen?style=flat-square)](https://nodejs.org)

**mailer-advance** is a high-performance Node.js email engine with absolute flexibility. It features dynamic SMTP hot-swapping, multi-DB persistence, and a premium "management-in-a-box" UI.

---

## ⚡ Quick Start: Get Running in 60 Seconds

1.  **Install**: `npm install mailer-advance`
2.  **Configure**: Set `DB_URI` in your `.env`.
3.  **Launch**:
    ```javascript
    import { DatabaseFactory, dbService } from 'mailer-advance';
    const repo = DatabaseFactory.createRepository('mongodb');
    await repo.connect(); // Automatically uses process.env.DB_URI
    dbService.setRepository(repo);
    ```

---

## ✨ v9.0 Highlights

- ⚡ **Smart Connection**: `connect()` automatically falls back to `process.env.DB_URI`.
- 📖 **Interactive Swagger UI**: Now fully supported with fixed asset paths.
- 🗄️ **Multi-DB Persistence**: Support for MongoDB, Postgres, and MySQL.
- 🔄 **Hot-Swapping**: Switch SMTP credentials at runtime via the Dashboard.
- 🛡️ **Production Ready**: Full STARTTLS support and descriptive error guards.

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
    swaggerRoutes,
    dbService, 
    DatabaseFactory 
} from 'mailer-advance';

const app = express();
app.use(express.json());

// 1. Initialize Persistence (Smart Fallback to process.env.DB_URI)
const repository = DatabaseFactory.createRepository(process.env.DB_TYPE || 'mongodb');
await repository.connect(); 
dbService.setRepository(repository);

// 2. Mount API Routes (Use these exact paths for Swagger compatibility)
app.use('/api', contactRoutes); 
app.use('/api/config', configRoutes);
app.use('/api-docs', swaggerRoutes);

app.listen(3000, () => {
    console.log('🚀 Engine active at http://localhost:3000');
    console.log('📖 API Docs: http://localhost:3000/api-docs');
});
```

---

## 📚 Interactive API Documentation (Swagger)

V9.0.0 fixes the "No operations defined" error by ensuring consistent mount paths. Always mount the routes as shown in the Quick Start to maintain Swagger compatibility.

👉 **`app.use('/api-docs', swaggerRoutes);`**

Once mounted, navigate to:
**`http://localhost:3000/api-docs`**

From there, you can:
- 🔍 **Explore**: See all available endpoints and their data structures.
- 🧪 **Test**: Send live requests to your mailer engine directly from the browser.
- 📜 **Spec**: Download the OpenApi spec for use in other tools.

---

## ⚙️ Environment Configuration (.env)

| Variable | Requirement | Description |
|----------|-------------|-------------|
| `DB_TYPE` | Optional | `mongodb`, `postgres`, or `mysql` (Default: `mongodb`) |
| `DB_URI` | **Required** | Your database connection string. |
| `MAIL_HOST` | Optional | Default SMTP Host (Fallback). |
| `MAIL_PORT` | Optional | Default SMTP Port (Default: `587`). |

### 💡 The .env Setup Guide
```env
# Database
DB_TYPE=mongodb
DB_URI=mongodb://127.0.0.1:27017/my_mailer_db

# Fallback SMTP
MAIL_HOST=smtp.your-provider.com
MAIL_PORT=587
MAIL_USER=admin@example.com
MAIL_PASS=your-secure-password
```

---

## 🔒 Security & Best Practices

- **App Privacy**: Always wrap the mailer routes/UI with your own authentication middleware.
- **TLS validation**: Ensure `rejectUnauthorized` is `true` for production SMTP.
- **Secrets**: Encrypt your `.env` files using [Dotenvx](https://dotenvx.com).

---

## 📜 License

MIT © [Pranay](https://github.com/pranay213)
