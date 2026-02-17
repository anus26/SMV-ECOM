import Order from "../models/ordermodels.js"
import Product from "../models/product.models.js"
import User from "../models/user.models.js"


const getalluser=async(req,res)=>{
    const user =await User.find().select("-password")

  res.json(user)
}
const approveseller=async(req,res)=>{
    try {
        const seller =await User.findById(req.params.id)
        if (!seller||seller.role !=="seller") {
              return res.status(404).json({ message: "Seller not found" });
        }
        seller.isApproved=true
        await seller.save()
            res.json({ message: "Seller approved successfully",seller });
    } catch (error) {
          res.status(500).json({ message: error.message });
  
    }
}
const blockuser=async(req,res)=>{
    const user =await User.findById(req.params.id)
     if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.isBlocked=!user.isBlocked
  await user.save()
  
  res.json({ message: "User block status updated" });
} 
const getplatformstats=async(req,res)=>{
    const totalUsers=await User.countDocuments()
    const totalOrders=await Order.countDocuments()
    const totalProducts=await Product.countDocuments()
     const totalSellers=await User.countDocuments({role:"seller"})
     const totalCustomer=await User.countDocuments({role:"customer"})
    res.json({
        totalUsers,
        totalOrders,
        totalProducts,
        totalSellers,
        totalCustomer
    })
}
export { approveseller,getalluser,blockuser,getplatformstats}