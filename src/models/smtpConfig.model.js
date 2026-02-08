import mongoose from 'mongoose';

const smtpConfigSchema = new mongoose.Schema({
    configId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    host: {
        type: String,
        required: true,
        trim: true
    },
    port: {
        type: Number,
        required: true
    },
    secure: {
        type: Boolean,
        default: false
    },
    auth: {
        user: {
            type: String,
            required: true,
            trim: true
        },
        pass: {
            type: String,
            required: true,
            trim: true
        }
    },
    tls: {
        rejectUnauthorized: {
            type: Boolean,
            default: true
        },
        enabled: {
            type: Boolean,
            default: true
        }
    },
    fromName: {
        type: String,
        trim: true
    },
    fromEmail: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const SmtpConfig = mongoose.model('SmtpConfig', smtpConfigSchema);

export default SmtpConfig;
