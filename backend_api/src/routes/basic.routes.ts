import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { auth } from '../auth/auth';

dotenv.config();

const basicRouter = Router();

basicRouter.get('/rota_auth', auth, (req: Request, res: Response) => { // Faz mesma coisa que a segunda rota get '/', mas com autenticação
    if (req.headers.nome) {
        return res.status(200).json({
            nome: req.headers.nome
        })
    } else {
        return res.status(200).json({
            message: "GET deu bom com auth kk!"
        });
    }
})

basicRouter.get('/', (req: Request, res: Response) => {
    if (req.headers.nome) {
        return res.status(200).json({
            nome: req.headers.nome
        })
    } else {
        return res.status(200).json({
            message: "GET deu bom kk!"
        });
    }

})

basicRouter.post('/login', (req: Request, res: Response) => {
    
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({
                message: "Usuário ou senha faltando!!"
            })
        }
    
        const accessToken = jwt.sign({
    
            user: name,
            password
    
        }, `${process.env.JWT_SECRET}`,
        {
            expiresIn: "1h"   
        }
        );
    
        return res.status(200).json({
            message: "Logado :)",
            accessToken
        })

    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }

})

export {  basicRouter };