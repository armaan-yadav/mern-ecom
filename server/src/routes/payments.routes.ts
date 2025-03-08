import { Router } from "express";
import {
  createOrder,
  verifyPayment,
} from "../controllers/payments.controllers.js";

const paymentsRouter = Router();

paymentsRouter.post("/create-order", createOrder);
paymentsRouter.post("/verify", verifyPayment);

export default paymentsRouter;
