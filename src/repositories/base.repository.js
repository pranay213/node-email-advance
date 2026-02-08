export class BaseRepository {
    async getSmtpConfig(configId) {
        throw new Error('Method not implemented');
    }

    async saveSmtpConfig(configId, config) {
        throw new Error('Method not implemented');
    }

    async getAllSmtpConfigs() {
        throw new Error('Method not implemented');
    }

    async connect() {
        throw new Error('Method not implemented');
    }
}
