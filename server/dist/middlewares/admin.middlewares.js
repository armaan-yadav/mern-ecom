import { tryCatch } from "./erorr.midddlewares.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { User } from "../models/user.models.js";
export const isAdminMiddleware = tryCatch(async (req, res, next) => {
    const id = req.query.id;
    if (!id)
        return next(new ErrorHandler("Admin id not provided", 400));
    const admin = await User.findById(id);
    if (!admin)
        return next(new ErrorHandler("No  admin exists with given id", 400));
    if (admin.role != "admin")
        return next(new ErrorHandler("Permission denied", 400));
    return next();
});
