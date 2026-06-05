import {CreateOrders,GetOrders,UpdateOrders, DeleteOrders} from "../controllers/Order.controller.js";
import express from "express";

const router = express.Router();

router.post("/create", CreateOrders);
router.get("/get", GetOrders);
router.put("/update/:id", UpdateOrders);
router.delete("/delete/:id", DeleteOrders);

export default router;