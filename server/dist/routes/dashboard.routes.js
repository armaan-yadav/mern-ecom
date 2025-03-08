import { Router } from "express";
import { getDashboardStats, getOrderStats, } from "../controllers/dashboard.controllers.js";
const dashboardRouter = Router();
dashboardRouter.get("/stats", getDashboardStats);
dashboardRouter.get("/stats-orders", getOrderStats);
export default dashboardRouter;
