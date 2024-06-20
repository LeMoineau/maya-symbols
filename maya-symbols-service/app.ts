import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';
import { routes } from './src/routes/routes';

// server config
const port = process.env.API_PORT ?? 8000;
const corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
    credentials: true
};
const app = express();

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(routes())

app.listen(port);
console.log(`Server running at http://localhost:${port}/`);
