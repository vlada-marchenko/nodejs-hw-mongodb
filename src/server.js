import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import configDotenv from 'dotenv';
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

configDotenv.config();

const PORT = Number(getEnvVar('PORT')) || 3000;

export const setUpServer = () => {
const app = express();
const studentRoutes = import('./routers/contacts.js');

app.use(cors());
app.use(pino({
    transport: {
        target: 'pino-pretty'
    }
}));
app.use(express.json());

app.use(studentRoutes);

app.all('/{*splat}', notFoundHandler);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
};

