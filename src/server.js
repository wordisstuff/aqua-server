import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { pinoSettings } from './constants/constants.js';
import { authDb, redirectUrl } from './constants/index.js';
import { notFindMiddleware } from './middlewares/notFindMiddleware.js';
import path from 'node:path';

import Router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import helloMark from './utils/helloMark.js';
import swaggerDocs from './middlewares/swaggerDocs.js';

export const setupServer = () => {
    const app = express();

    app.use(pino(pinoSettings));
    app.use(cors({ origin: [redirectUrl], credentials: true }));
    app.use(cookieParser());
    app.use(express.json());
    app.use('/api-docs', swaggerDocs());
    app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

    app.get('/', (req, res) => res.send(helloMark()));
    app.use(Router);

    app.use(notFindMiddleware);
    app.use(errorHandler);

    const PORT = authDb.port;

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
};
