import User from "../models/user.models.js";
import { sendMail } from "../utils/nodmailor/sendMail.js";
import crypto from "crypto";
const forgetpassword = async (req, res) => {
  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    // const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    await sendMail(user.email, );

    res.json({ message: "Password reset link sent to email" });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }
};

export { forgetpassword };