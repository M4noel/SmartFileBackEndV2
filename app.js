import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load environment variables
dotenv.config();

// Add the bin directory to PATH for qpdf
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const binPath = path.join(__dirname, '..', 'bin');
process.env.PATH = `${binPath};${process.env.PATH}`;

import apiRoutes from './routes/api.js';

const app = express();

// Configurações
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || '*'
}));
app.use(express.json());
app.use(express.static('public'));

// Multer para uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50 MB limit
  }
});

// Rotas
const router = apiRoutes(upload);
app.use('/api', router);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`qpdf binary path added to PATH: ${binPath}`);
});