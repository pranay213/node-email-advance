import express from 'express';
import multer from 'multer';
import mailService from '../services/mail.service.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @openapi
 * /api/contact:
 *   post:
 *     summary: Send an email via the contact form with optional attachments and dynamic SMTP lookup
 *     tags: [Email]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, email, message]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *               configId:
 *                 type: string
 *                 description: ID of the SMTP configuration stored in the database. Falls back to .env if not found or provided.
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
router.post('/contact', upload.array('attachments'), async (req, res) => {
    try {
        const { name, email, message, configId, to } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const attachments = req.files.map(file => ({
            filename: file.originalname,
            content: file.buffer,
            contentType: file.mimetype
        }));

        // Example of supporting embedded images: 
        // If a file is named 'logo.png', it can be referenced in HTML as <img src="cid:logo.png">
        const embeddedImages = req.files.map(file => ({
            filename: file.originalname,
            content: file.buffer,
            contentType: file.mimetype,
            cid: file.originalname // Using filename as CID for simplicity in this example
        }));

        const emailData = {
            to: to || process.env.MAIL_USER,
            subject: `New Contact Form Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        ${embeddedImages.length > 0 ? '<h4>Attachments Included</h4>' : ''}
      `,
            configId: configId || null,
            attachments: attachments.concat(embeddedImages) // Including both as attachments and potential CIDs
        };

        await mailService.sendEmail(emailData);

        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
