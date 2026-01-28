import { Router, Request, Response } from 'express';
import { shortenUrl } from '../url_shortener.ts';

const baseRouter: Router = Router();

baseRouter.post('/urls', (req: Request, res: Response) => {
    const originalUrl: string = req.body.originalUrl;
    const userId: string = req.body.userId;

    const expirationPeriod: string|null = req.body.expirationPeriod;
    const alias: string|null = req.body.alias;

    const shortUrl = shortenUrl(originalUrl);
    
    // Salvar no BD a URL encurtada com os dados recebidos

    return res.status(200).json({
        message: "URL encurtada com sucesso!",
        shortUrl
    });
})

export { baseRouter }