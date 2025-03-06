import { Router } from "express";
import {
  allOrders,
  deleteOrder,
  editOrder,
  myOrders,
  newOrder,
} from "../controllers/orders.controllers.js";
import { isAdminMiddleware } from "../middlewares/admin.middlewares.js";

const ordersRouter = Router();

ordersRouter.post("/new", newOrder);
ordersRouter.get("/my", myOrders);
ordersRouter.get("/all", isAdminMiddleware, allOrders);

ordersRouter.put("/:id", editOrder);

ordersRouter.delete("/:id", deleteOrder);

export default ordersRouter;
