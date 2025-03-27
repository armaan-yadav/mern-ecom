import { model, Schema } from "mongoose";
const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        unique: true,
    },
    description: { type: String, required: false },
}, { timestamps: true });
export const Category = model("Category", categorySchema);
