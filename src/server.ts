import 'reflect-metadata';
import express from 'express';
import { router } from './routes/Routes';
import "./database/connection";

const server = express();

server.use(express.json());
server.use(router);

server.listen(3000, () => {
    console.log('O servidor foi iniciado na porta: ' + '3000');
})