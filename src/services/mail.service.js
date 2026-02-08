import nodemailer from 'nodemailer';
import { mailConfig } from '../config/mail.config.js';
import dbService from './db.service.js';

class MailService {
    async sendEmail(data) {
        const { to, subject, text, html, fromName, fromEmail, configId, attachments } = data;

        // Resolve SMTP config: configId (DB) -> .env
        let smtpConfig = null;
        if (configId) {
            smtpConfig = await dbService.getSmtpConfig(configId);
        }

        const transporterConfig = smtpConfig || {
            host: mailConfig.host,
            port: mailConfig.port,
            secure: mailConfig.secure,
            auth: mailConfig.auth,
            tls: mailConfig.tls
        };

        console.log(`[MailService] Using SMTP configuration: ${smtpConfig ? 'Dynamic (from DB)' : 'Default (from .env)'}`);
        console.log(`[MailService] Host: ${transporterConfig.host}, Port: ${transporterConfig.port}`);
        console.log(`[MailService] TLS Enabled: ${transporterConfig.tls?.enabled !== false}, TLS Verify: ${transporterConfig.tls?.rejectUnauthorized !== false}`);

        const transporter = nodemailer.createTransport(transporterConfig);

        const mailOptions = {
            from: `"${fromName || mailConfig.fromName}" <${fromEmail || mailConfig.fromEmail}>`,
            to,
            subject,
            text,
            html,
            attachments: attachments || []
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log(`[MailService] Email sent successfully: ${info.messageId}`);
            return info;
        } catch (error) {
            console.error(`[MailService] Error sending email: ${error.message}`);
            throw error;
        }
    }
}

export default new MailService();
