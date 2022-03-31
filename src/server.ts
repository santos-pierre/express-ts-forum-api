import express from 'express';
import { config } from 'dotenv-flow';
import cors from 'cors';
require('express-async-errors');

config();

const app = express();

app.use(cors());

const { PORT, BASE_URL, NODE_ENV } = process.env;

app.get('/', (_, res) => {
    res.json({ message: 'Hello World' });
});

app.listen(PORT, () => {
    console.log(`Server Running on : ${BASE_URL}:${PORT} [${NODE_ENV}]`);
});
