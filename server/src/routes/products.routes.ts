import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getCategories,
  getLatestProducts,
  getProductById,
  getSearchedProducts,
  uploadImage,
} from "../controllers/products.controllers.js";
import { isAdminMiddleware } from "../middlewares/admin.middlewares.js";

const productsRouter = Router();

productsRouter.get("/latest-products", getLatestProducts);
productsRouter.get("/categories", getCategories);
productsRouter.get("/admin-products", isAdminMiddleware, getAllProducts);
productsRouter.get("/search", getSearchedProducts);
productsRouter.get("/:id", getProductById);

productsRouter.post(
  "/upload-image",
  isAdminMiddleware,
  upload.single("file"),
  uploadImage
);
productsRouter.post(
  "/add",
  isAdminMiddleware,
  upload.single("file"),
  addProduct
);

productsRouter.delete("/delete/:id", isAdminMiddleware, deleteProduct);

productsRouter.put(
  "/:id",
  isAdminMiddleware,
  upload.single("file"),
  editProduct
);

export default productsRouter;
