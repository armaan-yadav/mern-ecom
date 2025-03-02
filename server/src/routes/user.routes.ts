import express from "express";
import { createNewUser } from "../controllers/user.controllers.js";

const userRouter = express.Router();

userRouter.post("/create-user", createNewUser);

export default userRouter;
