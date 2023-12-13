import { NextResponse } from "next/server";
import { user as User } from "../../../../../model/user";
import { connectDB } from "../../../../../utils/dbconnect";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

export const POST = async (req) => {
  try {
    await connectDB();
    const { vaultPin } = await req.json();
    const token = await req.cookies.get("token")?.value;
    const user = await User.findOne({ token });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "session expire Login again",
        },
        { status: 404 }
      );
    } else if (!vaultPin || vaultPin.toString().length !== 6) {
      return NextResponse.json(
        { success: false, message: "Enter a 6-digit number vault pin" },
        { status: 422 }
      );
    } else if (!user.vaultPin) {
      return NextResponse.json(
        { success: false, message: "create 6 digit vault pin" },
        { status: 422 }
      );
    } else if (!(await bcrypt.compare(vaultPin, user.vaultPin))) {
      return NextResponse.json(
        { success: false, message: "Vault pin is incorrect" },
        { status: 402 }
      );
    }
    const payload = {
      authPin: true,
      validfrom: Date.now(),
      authExp: Date.now() + 15 * 60 * 1000,
    };
    const vaultPinAuth = await Jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    await User.findByIdAndUpdate(
      user._id,
      { vaultAuth: vaultPinAuth },
      { new: true }
    );
    return NextResponse.json(
      { success: true, message: "Successfull" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error Try Again" },
      { status: 500 }
    );
  }
};
