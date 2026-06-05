import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customer_name: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "shipped", "delivered"],
        default: "pending",
    },



}, { timestamps: true });

const order = mongoose.model("Order", orderSchema);;
export default order;