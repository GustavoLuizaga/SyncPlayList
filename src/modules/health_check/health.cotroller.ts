import { Router, Request, Response } from 'express';

export const healthCheck = ((req: Request, res: Response) => {
    res.status(200).send({ ok: true });
});
