import express from 'express';
import { config } from 'dotenv-flow';
import cors from 'cors';
import router from './routes';
import Pagination from './middlewares/Pagination';
require('express-async-errors');

config();

const app = express();

app.use(cors(), express.json());

const { PORT, BASE_URL, NODE_ENV } = process.env;

app.use('/api', Pagination(), router);

app.listen(PORT, () => {
    console.log(`Server Running on : ${BASE_URL}:${PORT} [${NODE_ENV}]`);
});

export default app;
