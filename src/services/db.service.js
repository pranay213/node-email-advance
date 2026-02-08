class DbService {
    constructor() {
        this.repository = null;
    }

    setRepository(repository) {
        this.repository = repository;
    }

    async getSmtpConfig(configId) {
        try {
            if (!this.repository) {
                throw new Error('Database repository not initialized. Please call dbService.setRepository(repository) before using this service.');
            }
            return await this.repository.getSmtpConfig(configId);
        } catch (error) {
            console.error(`[DbService] Error fetching config ${configId}:`, error.message);
            return null;
        }
    }

    async saveSmtpConfig(configId, config) {
        try {
            if (!this.repository) {
                throw new Error('Database repository not initialized. Please call dbService.setRepository(repository) before using this service.');
            }
            return await this.repository.saveSmtpConfig(configId, config);
        } catch (error) {
            console.error(`[DbService] Error saving config ${configId}:`, error.message);
            throw error;
        }
    }

    async getAllSmtpConfigs() {
        try {
            if (!this.repository) {
                throw new Error('Database repository not initialized. Please call dbService.setRepository(repository) before using this service.');
            }
            return await this.repository.getAllSmtpConfigs();
        } catch (error) {
            console.error('[DbService] Error fetching all configs:', error.message);
            return [];
        }
    }

    async seedDefaultConfig() {
        try {
            if (!this.repository) return;
            const exists = await this.repository.getSmtpConfig('default-config');
            if (!exists) {
                await this.saveSmtpConfig('default-config', {
                    host: process.env.MAIL_HOST,
                    port: parseInt(process.env.MAIL_PORT, 10),
                    secure: process.env.MAIL_SECURE === 'true',
                    auth: {
                        user: process.env.MAIL_USER,
                        pass: process.env.MAIL_PASS,
                    },
                    tls: {
                        rejectUnauthorized: process.env.MAIL_TLS_REJECT_UNAUTHORIZED !== 'false',
                        enabled: process.env.MAIL_TLS_ENABLED === 'true'
                    },
                    fromName: process.env.MAIL_FROM_NAME,
                    fromEmail: process.env.MAIL_FROM_EMAIL,
                });
                console.log('[DbService] Default config seeded.');
            }
        } catch (error) {
            console.error('[DbService] Error seeding default config:', error.message);
        }
    }
}

export default new DbService();
