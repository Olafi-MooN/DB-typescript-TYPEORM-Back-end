import 'reflect-metadata';
import express from 'express';
import { router } from './routes/Routes';
import "./database/connection";


const server = express();

server.use(express.json());
server.use(router);

const PORT = (process.env.PORT || 3001);

server.listen(PORT, () => {
    console.log('O servidor foi iniciado na porta: ' + PORT);
})