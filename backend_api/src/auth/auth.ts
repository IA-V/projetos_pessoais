import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.auth;

        if (!authHeader) {
            return res.status(401).json({
                message: "Sem autorização!"
            })
        }
    
        const decoded = jwt.verify(`${authHeader}`, `${process.env.JWT_SECRET}`) // Info de login do usuário
        next();
    } catch (error: any) {
        return res.status(500).json({
            error: error.message
        })
    }
}

export { auth };