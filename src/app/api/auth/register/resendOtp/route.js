import { otp } from "../../../../../../model/otp";
import otpGenerator from "otp-generator";
import { mailSender } from "../../../../../../utils/mailSender";
import { NextResponse } from "next/server";
import { connectDB } from "../../../../../../utils/dbconnect";
export const POST = async (req) => {
  try {
    await connectDB();
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
    //generate 8 digit otp
    const OTP = otpGenerator.generate(8, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    //create generated otp in OTP schema
    await otp.create({
      email: decode.email,
      otp: OTP,
    });

    //send otp via mail
    await mailSender(
      email,
      "Verify Your Email",
      `Verification code
  
        Please use the verification code below to sign in.
        
        ${OTP}
        
        If you didn’t request this, you can ignore this email.
        
        Thanks,
        The DevGlimpse team`
    );
    return NextResponse.json(
      { success: true, message: "OTP send successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    if (
      error.message === "Body is unusable" ||
      "Unexpected end of JSON input"
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
