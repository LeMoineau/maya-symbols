import { Router } from "express";

export function symbols(): Router {
    const router = Router();

    router.get('/', (_, res) => {
        res.status(200).send('all symbols !')
    })

    return router;
}