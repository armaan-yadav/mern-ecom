import express from "express";
import {
  createNewUser,
  deleteUserById,
  getAllUsers,
  getUserById,
} from "../controllers/user.controllers.js";
import { isAdminMiddleware } from "../middlewares/admin.middlewares.js";

const userRouter = express.Router();

userRouter.post("/create-user", createNewUser);
userRouter.get("/all-users", isAdminMiddleware, getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUserById);

export default userRouter;
