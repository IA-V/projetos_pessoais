import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { basicRouter } from './routes/basic.routes.ts';

dotenv.config(); // Necessário para utilização de variávei presentes no .env

const app = express();
app.use(cors({
    origin: ["http://localhost:3000"]
}));

app.use(basicRouter);

app.listen(process.env.PORT, () => {
    console.log("Servidor rodando!");
})