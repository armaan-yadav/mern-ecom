import { User } from "../models/user.models.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { tryCatch } from "../middlewares/erorr.midddlewares.js";
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
export const getAllUsers = tryCatch(async (req, res, next) => {
    const users = await User.find({});
    return res
        .status(200)
        .json({ success: true, message: "users fetched  succesfully", users });
});
export const getUserById = tryCatch(async (req, res, next) => {
    //extracting id from the param as it was passed ass dynamically in route
    const id = req.params.id;
    //TODO add id vaidation like length and all stuff
    const user = await User.findById(id);
    if (!user) {
        console.log("first");
        return next(new ErrorHandler("User  does  not exist", 400));
    }
    return res
        .status(200)
        .json({ success: true, message: "User fetched successfully", user });
});
export const deleteUserById = tryCatch(async (req, res, next) => {
    const id = req.params.id;
    if (!id)
        return next(new ErrorHandler("Invalid id", 400));
    const response = await User.findByIdAndDelete(id);
    if (!response)
        return next(new ErrorHandler("Invalid user id", 400));
    return res
        .status(200)
        .json({ success: true, message: "User  deleted successfully" });
});
