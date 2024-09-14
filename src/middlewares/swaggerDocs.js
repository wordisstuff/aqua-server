import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';
import path from 'node:path';
import createHttpError from 'http-errors';

const swaggerDocs = () => {
    try {
        const docs = fs.readFileSync(
            path.join(process.cwd(), 'docs', 'swagger.json'),
            {
                encoding: 'utf-8',
            },
        );
        const parsedDocs = JSON.parse(docs);
        console.log('PARSED', parsedDocs);

        return [...swaggerUI.serve, swaggerUI.setup(parsedDocs)];
    } catch (err) {
        return (req, res, next) => next(createHttpError(500, err.message));
    }
};

export default swaggerDocs;
