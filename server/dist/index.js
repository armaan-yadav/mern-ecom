import express from "express";
import userRouter from "./routes/user.routes.js";
import connectDB from "./db/db.js";
import { errorMiddleware } from "./middlewares/erorr.midddlewares.js";
import productsRouter from "./routes/products.routes.js";
import NodeCache from "node-cache";
import ordersRouter from "./routes/orders.routes.js";
import morgan from "morgan";
import couponRouter from "./routes/coupons.routes.js";
const app = express();
const port = 4000;
connectDB();
export const nodeCache = new NodeCache();
// for data to be read as valid json
app.use(express.json());
app.use(morgan("dev"));
app.get("/api/v1", (_, res) => {
    try {
        return res.status(200).json({ success: true, message: "Hello World" });
    }
    catch (error) {
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
//error middleware
app.use(errorMiddleware);
app.listen(port, () => {
    console.log("Express app is running at port ", port);
});
