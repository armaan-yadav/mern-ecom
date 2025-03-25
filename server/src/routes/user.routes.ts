import express from "express";
import {
  createNewUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateProfile,
  uploadImage,
} from "../controllers/user.controllers.js";
import { isAdminMiddleware } from "../middlewares/admin.middlewares.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = express.Router();

userRouter.get("/all-users", isAdminMiddleware, getAllUsers);
userRouter.get("/:id", getUserById);

userRouter.post("/create-user", createNewUser);
userRouter.post("/upload-image", upload.single("file"), uploadImage);

userRouter.put("/:id", updateProfile);

userRouter.delete("/:id", deleteUserById);

export default userRouter;
