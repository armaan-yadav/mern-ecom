import { User } from "../models/user.models.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { tryCatch } from "../middlewares/erorr.midddleware.js";
export const createNewUser = tryCatch(async (req, res, next) => {
    //extract the input
    const { _id, dob, email, gender, name, phone } = req.body;
    // validate the input
    if (!_id || !email || !name || !phone) {
        throw new ErrorHandler("Missing required fields", 400);
    }
    // Validate gender input
    if (!["male", "female"].includes(gender)) {
        throw new ErrorHandler("Invalid gender. Allowed values are 'male' or 'female'.", 400);
    }
    //create new user in db
    const user = await User.create({
        _id,
        dob: new Date(dob),
        email,
        gender,
        name,
        phone,
    });
    return res.status(201).json({
        message: `Welcome ${user.name}`,
        success: true,
        user,
    });
});
