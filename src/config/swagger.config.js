import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;
const serverUrl = process.env.SERVER_URL || `http://localhost:${port}`;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Email Service API',
      version: '1.0.0',
      description: 'A clean Node.js Email Service with dynamic SMTP support',
    },
    servers: [
      {
        url: serverUrl,
        description: 'Dynamic server URL',
      },
    ],
  },
  // Use absolute path to ensure routes are found when used as a library
  apis: [path.join(__dirname, '../routes/*.js')],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
