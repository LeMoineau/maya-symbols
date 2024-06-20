import { Router } from "express";

export function signatures(): Router {
    const router = Router();

    router.get('/', (_, res) => {
        res.status(200).send('all signatures !')
    })

    return router;
}