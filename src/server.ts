import express from 'express';
import { config } from 'dotenv-flow';
import cors from 'cors';
import router from './routes';
import Pagination from './middlewares/Pagination';
require('express-async-errors');

if (process.env.NODE_ENV !== 'test') {
    config();
}

const app = express();

app.use(cors(), express.json());

const { PORT, BASE_URL, NODE_ENV } = process.env;

app.use('/api', Pagination(), router);

const server = app.listen(PORT, () => {
    // Avoid Cross-Env warning in jest console.
    if (NODE_ENV !== 'test') {
        console.log(`Server Running on : ${BASE_URL}:${PORT} [${NODE_ENV}]`);
    }
});

export { app, server };
