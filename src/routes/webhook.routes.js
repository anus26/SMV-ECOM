import express from "express"
import Order from "../models/ordermodels.js"
import { stripe } from "../configstripe/stripe.js"

const webhookrouter=express.Router()
webhookrouter.post(
    "/webhook",
    express.raw({type:"application/json"}),
    async(req,res)=>{
        const sig=req.headers["stripe-signature"]
        try {
            const event=stripe.webhooks.constructEvent(
                req.body,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            )
            if (event.type==="payment_intent.succeeded") {
                const paymentIntent=event.data.object
                const orderId=paymentIntent.metadata.orderId
                console.log("Metadata:", paymentIntent.metadata);
                const order=await Order.findById(orderId)
                if (order) {
                    order.status='paid'
                    await order.save()
                    console.log("order marked as successfully");
                    
                }
            }
            res.json({received:true})
        } catch (error) {
  console.log("❌ Webhook Error:", error.message);
  res.status(400).send(`Webhook Error: ${error.message}`);
}
    }
)
export default webhookrouter