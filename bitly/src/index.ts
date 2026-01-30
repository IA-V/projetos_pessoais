import express from 'express';
import dotenv from 'dotenv';
import { baseRouter } from './routes/base.routes.ts';

dotenv.config(); // Necessário para utilização de variáveis presentes no .env

const app = express();

app.use(express.json());
app.use(baseRouter);

app.listen(process.env.PORT, () => {
    console.log(`Bitly rodando! Porta: ${process.env.PORT}`);
})