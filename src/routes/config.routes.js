import express from 'express';
import dbService from '../services/db.service.js';

const router = express.Router();

/**
 * @openapi
 * /api/config:
 *   get:
 *     summary: Get all SMTP configurations
 *     tags: [Configuration]
 *     responses:
 *       200:
 *         description: List of configurations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *   post:
 *     summary: Save an SMTP configuration
 *     tags: [Configuration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [configId, host, port, user, pass]
 *             properties:
 *               configId:
 *                 type: string
 *               host:
 *                 type: string
 *               port:
 *                 type: number
 *               secure:
 *                 type: boolean
 *               user:
 *                 type: string
 *               pass:
 *                 type: string
 *               fromName:
 *                 type: string
 *               fromEmail:
 *                 type: string
 *               tlsRejectUnauthorized:
 *                 type: boolean
 *                 description: Whether to reject unauthorized TLS connections. Defaults to true.
 *     responses:
 *       200:
 *         description: Configuration saved successfully
 */
router.post('/', async (req, res) => {
    try {
        const { configId, host, port, secure, user, pass, fromName, fromEmail, tlsRejectUnauthorized, tlsEnabled } = req.body;

        if (!configId || !host || !port || !user || !pass) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const config = {
            host,
            port: parseInt(port, 10),
            secure: secure === true,
            auth: { user, pass },
            tls: {
                rejectUnauthorized: tlsRejectUnauthorized !== false,
                enabled: tlsEnabled !== false
            },
            fromName: fromName || process.env.MAIL_FROM_NAME,
            fromEmail: fromEmail || process.env.MAIL_FROM_EMAIL
        };

        await dbService.saveSmtpConfig(configId, config);

        res.status(200).json({ success: true, message: 'Configuration saved successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * @openapi
 * /api/config/{configId}:
 *   get:
 *     summary: Get an SMTP configuration by ID
 *     tags: [Configuration]
 *     parameters:
 *       - in: path
 *         name: configId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Configuration retrieved successfully
 *       404:
 *         description: Configuration not found
 */
router.get('/', async (req, res) => {
    try {
        const configs = await dbService.getAllSmtpConfigs();
        res.status(200).json({ success: true, data: configs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/:configId', async (req, res) => {
    try {
        const config = await dbService.getSmtpConfig(req.params.configId);
        if (!config) {
            return res.status(404).json({ success: false, message: 'Configuration not found' });
        }
        res.status(200).json({ success: true, data: config });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
