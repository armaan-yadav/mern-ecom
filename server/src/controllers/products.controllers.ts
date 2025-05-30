import { nodeCache } from "../index.js";
import { tryCatch } from "../middlewares/erorr.midddlewares.js";
import { Product } from "../models/product.models.js";
import { BaseQuery } from "../types/types.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { invalidateCache, responseHandler } from "../utils/features.js";
import { updateProfile } from "./user.controllers.js";

export const uploadImage = tryCatch(async (req, res, next) => {
  if (!req.file?.path)
    throw new ErrorHandler("cound not find file from temp", 400);

  const url = await uploadOnCloudinary(req.file.path, "products");

  if (!url) throw new ErrorHandler("error  uploading file on cloudinary", 500);

  return responseHandler(res, 200, "file uploaded successfully", url);
});

export const addProduct = tryCatch(async (req, res, next) => {
  // const { name, price, stock, category } = JSON.parse(req.body.data);
  const { name, price, stock, category, inStock, photo } = req.body;

  if (!name || !price || !stock || !category || !inStock)
    throw new ErrorHandler("All fields are required", 400);

  // if (!req.file?.path)
  //   throw new ErrorHandler("Product image  not provided", 400);

  // const url = await uploadOnCloudinary(req.file.path);

  // if (!url) throw new ErrorHandler("Error uploading image on cloudinary", 500);

  const product = await Product.create({
    category,
    name,
    price,
    stock,
    photo,
    inStock,
  });

  await invalidateCache({ products: true });

  return responseHandler(res, 201, "product added successfully", { product });
});

// cache
export const getLatestProducts = tryCatch(async (req, res, next) => {
  let products = [];
  if (nodeCache.has("latestProducts")) {
    products = JSON.parse(nodeCache.get("latestProducts")!);
  } else {
    products = await Product.find().sort({ createdAt: -1 }).limit(5);
    nodeCache.set("latestProducts", JSON.stringify(products));
  }

  if (!products)
    throw new ErrorHandler(
      "Something went wrong while fetching latest products",
      500
    );

  return responseHandler(res, 201, "products fetched successfully", {
    products,
  });
});

//* REVALIDATE ON CREATE,UPDATE ,DELETE PRODUCT AND PLACE ORDER
//cache
export const getCategories = tryCatch(async (req, res, next) => {
  let categories = [];
  if (nodeCache.has("categories")) {
    categories = JSON.parse(nodeCache.get("categories")!);
  } else {
    categories = await Product.distinct("category");
    nodeCache.set("categories", JSON.stringify(categories));
  }

  if (!categories)
    throw new ErrorHandler(
      "Something went wrong while getting categories",
      500
    );

  return responseHandler(
    res,
    201,
    "categoried fetched successfully",
    categories
  );
});

export const deleteProduct = tryCatch(async (req, res, next) => {
  const { id } = req.params;

  //TODO validate producct id using regex
  //

  if (!id) throw new ErrorHandler("Product id is not provided", 400);

  const response = await Product.findByIdAndDelete(id);

  if (!response) throw new ErrorHandler("Invalid product id", 400);

  await invalidateCache({ products: true });

  return responseHandler(res, 200, "Product deleted successfully");
});

export const getProductById = tryCatch(async (req, res, next) => {
  const id = req.params.id;
  if (!id) return next(new ErrorHandler("Invalid id", 400));
  //TODO validate the id

  let product;
  if (nodeCache.has(`product-${id}`)) {
    product = JSON.parse(nodeCache.get(`product-${id}`)!);
  } else {
    product = await Product.findById(id);
    nodeCache.set(`product-${id}`, JSON.stringify(product)!);
  }

  if (!product) throw new ErrorHandler("abc", 400);

  return responseHandler(res, 200, "product fetched successfully", product);
});

//TODO can make  it better :
export const editProduct = tryCatch(async (req, res, next) => {
  const id = req.params.id;
  const { updatedFields } = req.body;
  // const updatedProduct = JSON.parse(updatedFields);

  if (!id) throw new ErrorHandler("Invalid id", 400);

  // const imagePath = req.file?.path;
  // console.log(imagePath);

  // if (Object.keys(updatedProduct).length == 0) {
  //   throw new ErrorHandler("No Value to update", 400);
  // }

  // if (imagePath) {
  //   const url = await uploadOnCloudinary(imagePath);
  //   updatedProduct.photo = url;
  // }

  console.log(updatedFields);

  const response = await Product.findByIdAndUpdate(id, updatedFields);

  if (!response) {
    throw new ErrorHandler(`Product with id ${id} does not exist`, 400);
  }

  await invalidateCache({ products: true });
  return responseHandler(res, 200, "product updated successfully");
});

//cache
export const getAllProducts = tryCatch(async (req, res, next) => {
  let products = [];

  if (nodeCache.has("allProducts")) {
    products = JSON.parse(nodeCache.get("allProducts")!);
  } else {
    products = await Product.find();
    nodeCache.set("allProducts", JSON.stringify(products));
  }

  if (!products)
    throw new ErrorHandler(
      "Something went wrong while fetching latest products",
      500
    );

  return responseHandler(res, 201, "products fetched successfully", products);
});

export const getSearchedProducts = tryCatch(async (req, res, next) => {
  const { search, sort, category, price } = req.query;
  const page = Number(req.query.page) || 1;
  const limit = Number(process.env.PRODUCT_PERPAGE_LIMIT) || 8;
  const skip = (page - 1) * limit;

  const baseQuery: BaseQuery = {};

  if (search) {
    baseQuery.name = { $regex: search as string, $options: "i" };
  }
  if (price) {
    baseQuery.price = { $lte: Number(price) };
  }
  if (category) {
    baseQuery.category = category as string;
  }

  const [products, filteredOnlyProducts] = await Promise.all([
    Product.find(baseQuery)
      .sort(sort && { price: sort == "asc" ? 1 : -1 })
      .limit(limit)
      .skip(skip),
    Product.find(baseQuery),
  ]);

  const totalPage = Math.ceil(filteredOnlyProducts.length / limit);

  if (!products)
    throw new ErrorHandler(
      "Something went wrong while fetching latest products",
      500
    );

  return responseHandler(res, 201, "products fetched successfully", {
    products,
    totalPage,
  });
});
