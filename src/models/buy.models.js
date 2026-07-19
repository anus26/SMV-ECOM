import mongoose from "mongoose";

const buySchema=new mongoose.Schema({
       userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    ProductId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product",      
    },
    FullName:{type:String,required:true},
    City:{type:String,required:true},
    Phone:{type:Number,required:true},
    Building:{type:String,required:true},
    Province:{type:String,required:true},
    Area:{type:String,required:true},
    Address:{type:String,required:true},
    Colony:{type:String,required:true},
    AddressType:{
        type:String,
        enum:["Home","Office"],
        required:true
    }

})
const Buy=mongoose.model("buy",buySchema)
export default Buy