import Order from "../models/ordermodels.js"

const order=async(req,res)=>{
    try {
          console.log("USER:", req.user);
    console.log("BODY:", req.body);
        const {items,totalAmount,}=req.body
        const customerid=req.user._id
          if ( !items || items.length === 0 || totalAmount===null ) {
      return res.status(400).json({ message: "All fields are required" });
    }

        const order=new Order({
            customerid,
            items,
            totalAmount,
            
        })
        await order.save()
        res.status(201).json({message:"Order is  successfully add",order})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Internal server error"})
        
    }
}
const orderdelete=async(req,res)=>{
    try {
        const {id}=req.params
        const order=await Order.findByIdAndDelete(id)
        if (!order) {
            return res.status(400).json({message:'Order not',order})
        }
        res.status(200).json({message:"Order Delete"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"order delete"})
        
    }
}
const orderget=async(req,res)=>{
    try {
        const {id}=req.params
        const ordergets=await Order.findById(id)
        if (!ordergets) {
                 return res.status(400).json({message:'Order not'})
        }
        res.status(200).json({message:'order get successfully',ordergets})
    } catch (error) {
        console.error('error',error);
        return res.status(500).json({message:"Internal server error"})
        
    }
}
const orderupdata = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = {};

    if (req.body.items) updateFields.items = req.body.items;
    if (req.body.status) updateFields.status = req.body.status;
    if (req.body.totalAmount) updateFields.totalAmount = req.body.totalAmount;

    const orderupdatas = await Order.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!orderupdatas) {
      return res.status(400).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order updated", orderupdatas });
  } catch (error) {
    console.error("error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const allorder=async(req,res)=>{
    try {
        const allorders=await Order.find()
        if (!allorders) {
            return res.status(400).json({message:"Order are not avalibliy"})
        }
        res.status(200).json({message:"All  order is availbaly" ,allorders})
    } catch (error) { 
         console.error('error',error);
        return res.status(500).json({message:"Internal server error"})
    }
}
export {order,orderdelete,orderget,orderupdata,allorder}