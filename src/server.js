import app from './app.js';
import dotenv from 'dotenv';
import dbService from './services/db.service.js';
import DatabaseFactory from './services/database.factory.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_TYPE = process.env.DB_TYPE || 'mongodb';
const DB_URI = process.env.DB_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/mail_service_db';

(async () => {
    try {
        const repository = DatabaseFactory.createRepository(DB_TYPE);
        await repository.connect(DB_URI);
        dbService.setRepository(repository);

        await dbService.seedDefaultConfig();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Database connected (${DB_TYPE})`);
        });
    } catch (err) {
        console.error('Failed to initialize application:', err.message);
        process.exit(1);
    }
})();
