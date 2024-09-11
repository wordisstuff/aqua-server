export const ctrlWrapper = ctrl => async (req, res, next) => {
    console.log('1', req.body);
    try {
        await ctrl(req, res, next);
        console.log('2', req.body);
    } catch (err) {
        next(err);
    }
};
