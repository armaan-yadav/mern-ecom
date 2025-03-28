import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    _id: { type: String, required: [true, "User id is required"] },
    name: { type: String, required: [true, "Name is required"] },
    phone: {
        type: String,
        required: false,
        // required: [true, "Phone is required"],
        // unique: [true, "Phone number must be unique"],
    },
    email: { type: String, unique: true },
    photo: { type: String },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    gender: {
        type: String,
        enum: ["male", "female"],
        // required: [true, "Gender is required"],
    },
    dob: {
        type: Date,
        //  required: [true, "DOB is required"]
    },
}, { timestamps: true });
// userSchema.virtual("age").get(function () {
//   const today = new Date();
//   const dob = this.dob;
//   let age = dob.getFullYear() - today.getFullYear();
//   if (
//     today.getMonth() < dob.getMonth() ||
//     (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
//   ) {
//     age--;
//   }
//   return age;
// });
export const User = mongoose.model("User", userSchema);
