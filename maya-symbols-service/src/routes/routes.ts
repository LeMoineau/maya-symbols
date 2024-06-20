import { Router } from "express";
import { symbols } from "./symbols";
import { signatures } from "./signatures";

export function routes() {
    const router = Router();

    router.get('/', (_, res) => {
        res.status(200).send("maya-symbols service running !")
    })
    router.use('/symbols', symbols())
    router.use('/signatures', signatures())

    return router;
}

// routes
// app.get('/', (_, res) => {res.send('symbols API working!')});
// app.get('/symbols', symbolsService.getSymbols);
// app.get('/symbols/:sid', symbolsService.getSymbolsById);
// app.post('/symbols', symbolsService.addSymbol)

// app.get('/signatures/:sid', signatureService.getSignature);