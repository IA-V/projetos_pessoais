import { Router, Request, Response } from 'express';
import { shortenUrl } from '../url_shortener.ts';

const baseRouter: Router = Router();

baseRouter.post('/urls', (req: Request, res: Response) => {
    try {
        const originalUrl: string = req.body.originalUrl;
        const userId: string = req.body.userId;
    
        const expirationPeriod: string|null = req.body.expirationPeriod;
        const alias: string|null = req.body.alias;

        if (alias) {
            // Verificar no BD se o alias já existe
            // se existir, retornar erro
        }
    
        const shortUrl = shortenUrl(originalUrl, alias);
        
        // Salvar no BD a URL encurtada com os dados recebidos
    
        return res.status(200).json({
            message: "URL encurtada com sucesso!",
            shortUrl
        });
    } catch (error) {
        return res.status(400).json({
            message: "Erro ao encurtar a URL.",
            error
        })
    }
    
})

baseRouter.get('/urls/:shortUrl', (req: Request, res: Response) => {
    // Recuperar a URL original do BD a partir da shortUrl
    // Redirecionar para a URL original
    // Se não existir URL original, retornar erro 404
    
    return res.redirect(302, "https://google.com"); // Redirecionar para a URL original
});

export { baseRouter }