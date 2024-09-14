import mongoose from 'mongoose';
import errorHandler from './errorHandler.js';

const isValidId = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(errorHandler(400, 'Invalid ID format'));
    }
    next();
};

export default isValidId;
