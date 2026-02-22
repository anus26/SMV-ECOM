import Stripe from "stripe";

export const stripe=await Stripe(process.env.STRIPE_SECRET_KEYT)