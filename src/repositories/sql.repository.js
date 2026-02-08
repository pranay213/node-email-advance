import { Sequelize, DataTypes } from 'sequelize';
import { BaseRepository } from './base.repository.js';

export class SqlRepository extends BaseRepository {
    constructor(dialect) {
        super();
        this.dialect = dialect;
    }

    async connect(uri) {
        this.sequelize = new Sequelize(uri, {
            dialect: this.dialect,
            logging: false
        });

        this.SmtpConfig = this.sequelize.define('SmtpConfig', {
            configId: { type: DataTypes.STRING, unique: true, primaryKey: true },
            host: { type: DataTypes.STRING, allowNull: false },
            port: { type: DataTypes.INTEGER, allowNull: false },
            secure: { type: DataTypes.BOOLEAN, defaultValue: false },
            user: { type: DataTypes.STRING, allowNull: false },
            pass: { type: DataTypes.STRING, allowNull: false },
            tlsRejectUnauthorized: { type: DataTypes.BOOLEAN, defaultValue: true },
            tlsEnabled: { type: DataTypes.BOOLEAN, defaultValue: true },
            fromName: { type: DataTypes.STRING },
            fromEmail: { type: DataTypes.STRING }
        });

        await this.sequelize.authenticate();
        await this.sequelize.sync();
        console.log(`Connected to SQL (${this.dialect})`);
    }

    async getSmtpConfig(configId) {
        const config = await this.SmtpConfig.findByPk(configId);
        if (!config) return null;

        // Convert flat SQL structure back to nested config object used by services
        const data = config.toJSON();
        return {
            host: data.host,
            port: data.port,
            secure: data.secure,
            auth: { user: data.user, pass: data.pass },
            tls: { rejectUnauthorized: data.tlsRejectUnauthorized, enabled: data.tlsEnabled },
            fromName: data.fromName,
            fromEmail: data.fromEmail
        };
    }

    async saveSmtpConfig(configId, config) {
        // Flatten nested config object for SQL storage
        const flatConfig = {
            configId,
            host: config.host,
            port: config.port,
            secure: config.secure,
            user: config.auth.user,
            pass: config.auth.pass,
            tlsRejectUnauthorized: config.tls.rejectUnauthorized,
            tlsEnabled: config.tls.enabled,
            fromName: config.fromName,
            fromEmail: config.fromEmail
        };

        await this.SmtpConfig.upsert(flatConfig);
        return true;
    }

    async getAllSmtpConfigs() {
        const configs = await this.SmtpConfig.findAll();
        return configs.map(config => {
            const data = config.toJSON();
            return {
                configId: data.configId,
                host: data.host,
                port: data.port,
                secure: data.secure,
                auth: { user: data.user, pass: data.pass },
                tls: { rejectUnauthorized: data.tlsRejectUnauthorized, enabled: data.tlsEnabled },
                fromName: data.fromName,
                fromEmail: data.fromEmail
            };
        });
    }
}
