import createHttpError from 'http-errors';

export const notFindMiddleware = (req, res, next) => {
    // res.status(404).send({ message: 'Not found' });
    next(createHttpError(404, 'Route not found.'));
};
