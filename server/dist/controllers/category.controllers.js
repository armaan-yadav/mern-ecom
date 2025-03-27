import { nodeCache } from "../index.js";
import { tryCatch } from "../middlewares/erorr.midddlewares.js";
import { Category } from "../models/category.model.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { responseHandler } from "../utils/features.js";
export const getAllCategories = tryCatch(async (req, res, next) => {
    let categories = [];
    if (nodeCache.has("categories")) {
        categories = JSON.parse(nodeCache.get("categories"));
    }
    else {
        categories = await Category.find();
        nodeCache.set("categories", JSON.stringify(categories));
    }
    if (!categories)
        throw new ErrorHandler("Something went wrong while fetching categories", 500);
    return responseHandler(res, 200, "Categories fetched successfully", categories);
});
export const createNewCategory = tryCatch(async (req, res, next) => {
    const { name, description } = req.body;
    if (!name)
        throw new ErrorHandler("Category name is required", 400);
    const category = await Category.create({ name, description });
    if (!category)
        throw new ErrorHandler("Error while creating category", 400);
    return responseHandler(res, 201, "Category created successfully", category);
});
export const updateCategory = tryCatch(async (req, res, next) => {
    const { name, description, id } = req.body;
    if (!name || !id)
        throw new ErrorHandler("All fields are required", 400);
    const category = await Category.findByIdAndUpdate(id, { name, description });
    if (!category)
        throw new ErrorHandler("Error while updating category", 400);
    return responseHandler(res, 201, "Category created successfully");
});
export const deleteCategory = tryCatch(async (req, res, next) => {
    const { id } = req.body;
    if (!id)
        throw new ErrorHandler("Category id is  required", 400);
    const category = await Category.findByIdAndDelete(id);
    if (!category)
        throw new ErrorHandler("Error while updating category", 400);
    return responseHandler(res, 200, "Category deleted successfully");
});
