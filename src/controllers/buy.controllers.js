import Buy from "../models/buy.models.js";

const buyadd = async (req, res) => {
  try {
    const {
        
      FullName,
      Address,
      Area,
      Office,
      Home,
      City,
      Phone,
      Building,
      Province,
      Colony
    } = req.body;

    if (
      !FullName ||
      !Address ||
      !Area ||
      !Office ||
      !Home ||
      !City ||
      !Phone ||
      !Building ||
      !Province ||
      !Colony
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const buy = new Buy({
           userId:req.user._id,

      FullName,
      Address,
      Area,
      Office,
      Home,
      City,
      Phone,
      Building,
      Province,
      Colony
    });

    await buy.save();

    res.status(201).json({
      message: "Buy address added successfully",
      buy
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

export { buyadd };