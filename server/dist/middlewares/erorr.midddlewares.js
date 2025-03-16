export async function errorMiddleware(err, req, res, next) {
    err.message ||= "Internal Server Error.";
    err.statusCode ||= 500;
    return res.status(400).json({ message: err.message, success: false });
}
export const tryCatch = (func) => {
    return async (req, res, next) => {
        return Promise.resolve(func(req, res, next)).catch((err) => next(err));
    };
};
