import mongoose from "mongoose";
const couponSchema = new mongoose.Schema({
    coupon: {
        type: String,
        unique: true,
        required: [true, "Coupon code is required"],
    },
    amount: {
        type: Number,
        required: [true, "Coupon discount amount is required"],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
export const Coupon = mongoose.model("Coupon", couponSchema);
