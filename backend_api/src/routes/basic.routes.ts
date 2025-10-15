import { Router, Request, Response } from 'express';

const basicRouter = Router();

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

export {  basicRouter };