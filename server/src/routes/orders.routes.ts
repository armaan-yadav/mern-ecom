import { Router } from "express";
import {
  allOrders,
  deleteOrder,
  editOrder,
  getOrderById,
  myOrders,
  newOrder,
} from "../controllers/orders.controllers.js";
import { isAdminMiddleware } from "../middlewares/admin.middlewares.js";

const ordersRouter = Router();

ordersRouter.post("/new", newOrder);
ordersRouter.get("/my", myOrders);
ordersRouter.get("/all", isAdminMiddleware, allOrders);

ordersRouter.get("/:id", getOrderById);

ordersRouter.put("/:id", isAdminMiddleware, editOrder);

ordersRouter.delete("/:id", isAdminMiddleware, deleteOrder);

// another way
// ordersRouter.route("/:id").get(getOrderById).put(editOrder).delete(deleteOrder);

export default ordersRouter;
