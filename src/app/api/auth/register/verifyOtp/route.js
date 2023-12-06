import { NextResponse } from "next/server";
import { connectDB } from "../../../../../../utils/dbconnect";
import { User as User } from "../../../../../../model/user";
import Jwt from "jsonwebtoken";
import { otp as OTP } from "../../../../../../model/otp";

export const POST = async (req) => {
  try {
    await connectDB();
    const { otp } = await req.json();
    const cookiesValue = await req.cookies.get("data")?.value;
    if (!cookiesValue) {
      return NextResponse.json(
        { success: false, message: "Please register first" },
        { status: 402 }
      );
    }
    const decode = Jwt.verify(cookiesValue, process.env.JWT_SECRET);
    if (!decode) {
      return NextResponse.json(
        { success: false, message: "unable to verify" },
        { status: 406 }
      );
    }
    // console.log(decode);
    const recentOtp = await OTP.findOne({ email: decode.email })
      .sort({ createdAt: -1 })
      .limit(1);

    if (!recentOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP not found. Try to resend otp",
      });
    }
    if (otp !== recentOtp.otp) {
      return NextResponse.json(
        { success: false, message: "Invalid otp" },
        { status: 406 }
      );
    }
    await User.create({
      firstName: decode.firstName,
      lastName: decode.lastName,
      email: decode.email,
      isEmailVerify: true,
      password: decode.password,
      profileImg: `https://api.dicebear.com/7.x/fun-emoji/png?seed=${decode.firstName}`,
    });
    return NextResponse.json(
      { success: true, message: "Account create successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    if (
      error.message === "Body is unusable" ||
      error.message === "Unexpected end of JSON input"
    ) {
      return NextResponse.json(
        { success: false, message: "Data can't be empty" },
        { status: 406 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Internal server error Try Again" },
      { status: 500 }
    );
  }
};
