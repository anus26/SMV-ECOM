import Order from "../models/ordermodels.js"

const order=async(req,res)=>{
    try {
        const {items,totalAmount,status}=req.body
        const customerid=req.user._id
          if (!customerid || !items || items.length === 0 || !totalAmount || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

        const order=new Order({
            customerid,
            items,
            totalAmount,
            status
        })
        await order.save()
        res.status(201).json({message:"Order is  successfully add",order})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Internal server error"})
        
    }
}
export {order}