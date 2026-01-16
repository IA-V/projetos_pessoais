import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = (requiredRole: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.auth;

            if (!authHeader) {
                return res.status(401).json({
                    message: "Sem autenticação!"
                })
            }
        
            const decoded = jwt.verify(`${authHeader}`, `${process.env.JWT_SECRET}`) as any // Info de login do usuário

            (req as any).user = decoded;

            authorization(requiredRole, decoded.role);

            next();
        } catch (error: any) {
            if (error.name == "JsonWebTokenError") {
                return res.status(401).json({
                    error: "Token inválido!"
                })
            }
            
            return res.status(error.cause).json({
                error: error.message
            })
        }
    }
}

const authorization = (requiredRole: string, currentRole: string) => {
    if (requiredRole !== currentRole) {
        throw new Error("Acesso negado! Usuário não autorizado", { cause: 403 });
    }
}

export { auth, authorization };