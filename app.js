import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Definir separador de PATH correto para Windows/Linux
const pathSeparator = process.platform === 'win32' ? ';' : ':';

// Adicionar o diretório bin ao PATH se existir
const binPath = path.join(__dirname, '..', 'bin');
if (fs.existsSync(binPath)) {
  process.env.PATH = `${binPath}${pathSeparator}${process.env.PATH}`;
  console.log(`Bin path added to PATH: ${binPath}`);
} else {
  console.warn(`Bin path not found: ${binPath}`);
}

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
    fileSize: 50 * 1024 * 1024 // 50 MB
  }
});

// Rotas
const router = apiRoutes(upload);
app.use('/api', router);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Plataforma detectada: ${process.platform}`);
});
