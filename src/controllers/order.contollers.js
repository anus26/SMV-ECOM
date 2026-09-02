import Stripe from "stripe";
import Order from "../models/ordermodels.js"
import Product from "../models/product.models.js";
 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const order = async (req, res) => {
  try {
    console.log("USER:", req.user);
    console.log("BODY:", req.body);

    const { items, paymentMethod, buyerId ,} = req.body;

    const customerid = req.user._id;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Items are required"
      });
    }

    if (!buyerId) {
      return res.status(400).json({
        message: "Buyer address is required"
      });
    }

    let totalAmount = 0;
    let updatedItems = [];

    for (let item of items) {

      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }

      const itemTotal = product.price * item.quantity;

      totalAmount += itemTotal;

      updatedItems.push({
        productId: product._id,
        sellerId: product.sellerId,
        quantity: item.quantity,
        price: product.price
      });
    }

    if (totalAmount < 50) {
      totalAmount = 50;
    }

    const newOrder = new Order({
      customerid,
      buyerId,                 // ✅ Buy._id
      items: updatedItems,
      totalAmount,
      paymentMethod
    });

    await newOrder.save();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100,
      currency: "inr",
      metadata: {
        orderId: newOrder._id.toString()
      }
    });

    newOrder.stripePaymentIntentId = paymentIntent.id;

    await newOrder.save();

    res.status(201).json({
      message: "Order is successfully added",
      order: newOrder,
      ClinetSecret: paymentIntent.client_secret
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};
const orderdelete=async(req,res)=>{
    try {
        const {id}=req.params
        const deleteorder=await Order.findByIdAndDelete(id)
        if (!deleteorder) {
            return res.status(400).json({message:'Order not'})
        }
        res.status(200).json({message:"Order Deleted successfully",deleteid:deleteorder._id})
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
        if (req.user.role==="seller") {
            orderget=await Order.ind
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
    
    if (!req.body) {
      return res.status(400).json({ message: "No data sent" });
    }
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

const allorder = async (req, res) => {
  try {
    let allorders;

    if (req.user.role === "customer") {
      allorders = await Order.find({ customerid: req.user._id });
    } 
    else if (req.user.role === "seller") {

      const sellerProducts = await Product.find({ sellerId: req.user._id });
      const productIds = sellerProducts.map(p => p._id);

      allorders = await Order.find({
        "items.productId": { $in: productIds }
      });
    } 
    else {
      // admin
      allorders = await Order.find();
    }

    res.status(200).json({
      message: "All orders available",
      allorders
    });

  } catch (error) {
    console.error("error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const ordercustomer = async (req, res) => {
    console.log("Params:", req.params);
  try {
    const ordercustomer = await Order.find({
      customerid: req.params.id,
    })
    .populate("items.productId")
    .populate("buyerId");

    if (ordercustomer.length === 0) {
      return res.status(404).json({
        message: "No orders found",
      });
    }

    res.status(200).json({
      message: "Orders fetched successfully",
      ordercustomer,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export {order,orderdelete,orderget,orderupdata,allorder ,ordercustomer}