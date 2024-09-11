import createHttpError from 'http-errors';

const validateBody = schema => (req, res, next) => {
    console.log('VALIDATE', req.body);
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        next(createHttpError(400, { data: error.details }));
    }
    next();
};

export default validateBody;
