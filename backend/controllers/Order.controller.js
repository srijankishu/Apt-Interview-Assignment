import orders from "../models/Order.js";

const CreateOrders = async(req,res)=>{
    try{
        const order = await orders.create(req.body);
        res.status(201).json(order);
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Error creating order"});
    }
}

const GetOrders = async(req,res)=>{
    try{
        const order = await orders.find();  
        res.status(200).json(order);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Error fetching orders" });
    }
   
}

const UpdateOrders = async(req,res)=>{
    try{
        const order = await orders.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(order);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Error updating order" });
    }
}

const DeleteOrders = async(req,res)=>{
    try{
        await orders.findByIdAndDelete(req.params.id); 
        res.status(200).json({ message: "Order deleted successfully" });
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Error deleting order" });
    }       
}

export { CreateOrders, GetOrders, UpdateOrders, DeleteOrders };         