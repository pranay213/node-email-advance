import mongoose from 'mongoose';
import SmtpConfig from '../models/smtpConfig.model.js';
import { BaseRepository } from './base.repository.js';

export class MongoRepository extends BaseRepository {
    async connect(uri) {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    }

    async getSmtpConfig(configId) {
        return await SmtpConfig.findOne({ configId }).lean();
    }

    async saveSmtpConfig(configId, config) {
        await SmtpConfig.findOneAndUpdate(
            { configId },
            { ...config, configId },
            { upsert: true, new: true }
        );
        return true;
    }

    async getAllSmtpConfigs() {
        return await SmtpConfig.find().lean();
    }
}
