import { Router, Request, Response } from 'express';

const basicRouter = Router();

basicRouter.get('/', (req: Request, res: Response) => {
    return res.status(200).json({
        message: "GET deu bom kk!"
    });
})

export {  basicRouter };