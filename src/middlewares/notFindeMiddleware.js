import createHttpError from 'http-errors';

export const notFindeMiddleware = (req, res, next) => {
    // res.status(404).send({ message: 'Not found' });
    next(createHttpError(404, 'Route not found.'));
};