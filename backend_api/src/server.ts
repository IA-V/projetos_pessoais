import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { basicRouter } from './routes/basic.routes.ts';

dotenv.config(); // Necessário para utilização de variáveis presentes no .env

const app = express();
app.use(cors({ // Necessário para definir segurança - quais domínios podem acessar a API
    origin: ["http://localhost:3000"]
}));
app.use(express.json()); // Necessário para interpretar JSON no body das requisições

app.use(basicRouter);

app.listen(process.env.PORT, () => {
    console.log("Servidor rodando!");
})