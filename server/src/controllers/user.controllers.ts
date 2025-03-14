import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.models.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { tryCatch } from "../middlewares/erorr.midddlewares.js";
import { responseHandler } from "../utils/features.js";

export const createNewUser = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    //extract the input
    const { _id, email, name } = req.body;

    console.log(req.body);

    // validate the input
    if (!_id || !email || !name) {
      throw new ErrorHandler("Missing required fields", 400);
    }

    //create new user in db
    const user = await User.create({
      _id,
      email,
      name,
    });

    return responseHandler(res, 201, `Welcome ${user.name}`, user);
  }
);

export const getAllUsers = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find({});

    return responseHandler(res, 200, "users fetched successfully", users);
  }
);

export const getUserById = tryCatch(async (req, res, next) => {
  //extracting id from the param as it was passed ass dynamically in route

  const id = req.params.id;

  //TODO add id vaidation like length and all stuff
  const user = await User.findById(id);

  if (!user) {
    console.log("first");
    return next(new ErrorHandler("User does not exist", 400));
  }

  return responseHandler(res, 200, "User fetched successfully", user);
});

export const deleteUserById = tryCatch(async (req, res, next) => {
  const id = req.params.id;
  if (!id) return next(new ErrorHandler("Invalid id", 400));

  const response = await User.findByIdAndDelete(id);

  if (!response) return next(new ErrorHandler("Invalid user id", 400));

  return responseHandler(res, 200, "User deleted successfully");
});
