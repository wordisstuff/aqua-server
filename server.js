import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { pinoSettings } from './constants/constants.js';
import { authDb } from './constants/index.js';
import { notFindeMiddleware } from './middlewares/notFindeMiddleware.js';

import Router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import swaggerDocs from './middlewares/swaggerDocs.js';

export const setupServer = () => {
  const app = express();

  app.use(pino(pinoSettings));
  app.use(cors());
  app.use(cookieParser());

  //   app.use('/api-docs', swaggerDocs());
  //   app.use('/uploads', express.static(UPLOAD_DIR));

  app.get('/', (req, res) =>
    res.send(
      // `Hello! It is Wordisstuff home work.  Click <a href="${tps.domain}${authDb.port}/api-docs/"> Api Docs </a>`,
      `Hello! It is aquatracker server.  Click <a href="!!!/api-docs/"> Api Docs </a>`,
    ),
  );
  app.use(Router);

  app.use(notFindeMiddleware);
  app.use(errorHandler);

  const PORT = authDb.port;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};
