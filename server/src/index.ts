import express, { Application, Response } from "express";
import userRouter from "./routes/user.routes.js";
import cors from "cors";
import morgan from "morgan";
import NodeCache from "node-cache";
import connectDB from "./config/db.config.js";
import { errorMiddleware } from "./middlewares/erorr.midddlewares.js";
import couponRouter from "./routes/coupons.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import ordersRouter from "./routes/orders.routes.js";
import paymentsRouter from "./routes/payments.routes.js";
import productsRouter from "./routes/products.routes.js";

const app: Application = express();
const port = 4000;

connectDB();

export const nodeCache = new NodeCache();

// for data to be read as valid json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));

app.get("/api/v1", (_, res: Response) => {
  try {
    return res.status(200).json({ success: true, message: "Hello World" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

// routers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/orders", ordersRouter);
app.use("/api/v1/coupons", couponRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/payments", paymentsRouter);

//error middleware
app.use(errorMiddleware);

app.listen(port, () => {
  console.log("Express app is running at port ", port);
});
