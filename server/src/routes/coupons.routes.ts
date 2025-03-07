import { Router } from "express";
import {
  allCoupons,
  applyCoupon,
  changeActiveStatus,
  deleteCoupon,
  newCoupon,
} from "../controllers/coupons.controllers.js";
import { isAdminMiddleware } from "../middlewares/admin.middlewares.js";

const couponRouter = Router();

couponRouter.post("/new", isAdminMiddleware, newCoupon);
couponRouter.get("/all", isAdminMiddleware, allCoupons);
couponRouter.get("/apply", applyCoupon);
couponRouter.put("/isActive/:id", isAdminMiddleware, changeActiveStatus);
couponRouter.delete("/:id", isAdminMiddleware, deleteCoupon);
export default couponRouter;
