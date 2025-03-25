import { Router } from "express";
import { allOrders, deleteOrder, editOrder, getOrderById, myOrders, newOrder, } from "../controllers/orders.controllers.js";
const ordersRouter = Router();
//  TODO add isAdminMIddleware
ordersRouter.post("/new", newOrder);
ordersRouter.get("/my", myOrders);
ordersRouter.get("/all", allOrders);
ordersRouter.get("/:id", getOrderById);
ordersRouter.put("/:id", editOrder);
ordersRouter.delete("/:id", deleteOrder);
// another way
// ordersRouter.route("/:id").get(getOrderById).put(editOrder).delete(deleteOrder);
export default ordersRouter;
