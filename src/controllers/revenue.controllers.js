import Order from "../models/ordermodels.js";


const getTotalRevenue = async (req, res) => {
  try {

    const sellerId = req.user._id;

    const revenue = await Order.aggregate([

      { $unwind: "$items" },

      {
        $match: {
          "items.sellerId": sellerId,
          status: "paid"
        }
      },

      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: {
              $multiply: ["$items.price", "$items.quantity"]
            }
          }
        }
      }

    ]);

    return res.json({
      totalRevenue: revenue[0]?.totalRevenue || 0
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getdailyRevenue=async(req,res)=>{
  try { 
   const sellerId=req.user._id
   const revenue=await Order.aggregate([
    {$unwind:"$items"},
    {
      $match:{
       "items.sellerId": sellerId,
        status:"paid"
      }
    },
    {$group:{
      _id:{
        $dateToString: {
        format:"%Y,-%m,-%d",
          date: { $toDate: "$createdAt" } 
      }},
   totalRevenue: {
    $sum: {
      $multiply: ["$items.price", "$items.quantity"]
    }
    }},
  },
  
  
     { $sort: { _id: 1 } },
   ])
return res.json(revenue)

  } catch (error) {
       res.status(500).json({ message: error.message });
  }
}

const getMonthlyRevenue = async (req, res) => {
  try {
    const sellerId = req.user._id;

    const revenue = await Order.aggregate([
         { $unwind: "$items" },
      {
        $match: {
          "items.sellerId":sellerId,
          status: "paid"
        }
      },
    {$group:{
      _id:{
        $dateToString: {
        format:"%Y,-%m",
          date: { $toDate: "$createdAt" } 
      }},
   totalRevenue: {
    $sum: {
      $multiply: ["$items.price", "$items.quantity"]
    }
   }
  }}
      
    ]);

    res.json(revenue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export  {getTotalRevenue,getMonthlyRevenue,getdailyRevenue}