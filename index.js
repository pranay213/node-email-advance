import contactRoutes from './src/routes/contact.routes.js';
import configRoutes from './src/routes/config.routes.js';
import mailService from './src/services/mail.service.js';
import dbService from './src/services/db.service.js';
import DatabaseFactory from './src/services/database.factory.js';

export {
    contactRoutes,
    configRoutes,
    mailService,
    dbService,
    DatabaseFactory
};

// Default export for easy middleware usage
export default {
    contactRoutes,
    configRoutes,
    mailService,
    dbService,
    DatabaseFactory
};
