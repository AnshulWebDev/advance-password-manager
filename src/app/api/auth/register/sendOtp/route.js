import { NextResponse } from "next/server";
import { connectDB } from "../../../../../../utils/dbconnect";
import { User } from "../../../../../../model/user";
import bcrypt from "bcrypt";
import validator from "validator";
import { mailSender } from "../../../../../../utils/mailSender";
import otpGenerator from "otp-generator";
import Jwt from "jsonwebtoken";
import { otp } from "../../../../../../model/otp";
export const POST = async (req) => {
  try {
    await connectDB();
    const { firstName, lastName, email, confirmPassword, password } =
      await req.json();

    //check input validation is in correct format
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields." },
        { status: 402 }
      );
    } else if (!validator.isAlpha(firstName, "en-US", { ignore: " " })) {
      // Use isAlpha from the validator library to check if the name contains only alphabets
      return NextResponse.json(
        {
          success: false,
          message: "first name should only contain alphabets.",
        },
        { status: 402 }
      );
    } else if (!validator.isAlpha(lastName, "en-US", { ignore: " " })) {
      // Use isAlpha from the validator library to check if the name contains only alphabets
      return NextResponse.json(
        { success: false, message: "last name should only contain alphabets." },
        { status: 402 }
      );
    } else if (confirmPassword.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password is too short. minimum length is 8.",
        },
        { status: 401 }
      );
    } else if (confirmPassword !== password) {
      return NextResponse.json(
        {
          success: false,
          message: "Password and Confirm Password must match.",
        },
        { status: 401 }
      );
    } else if (!validator.isEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Enter valid email id.",
        },
        { status: 401 }
      );
    }

    //check if user is already registered or not
    const finduser = await User.findOne({ email: email });
    if (finduser) {
      return NextResponse.json(
        { success: false, message: "Email is already registered" },
        { status: 401 }
      );
    }

    //add hashing to input password
    const hashPassword = await bcrypt.hash(password, 10);

    //generate 8 digit otp
    const OTP = otpGenerator.generate(8, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    //create generated otp in OTP schema
    await otp.create({
      email,
      otp: OTP,
    });

    //payload for jsonwebtoken
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashPassword,
    };
    const data = Jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
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

    const response = NextResponse.json(
      { success: true, message: "otp send successfully" },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );

    //set user details to cookies
    response.cookies.set({
      name: "data",
      value: data,
      httpOnly: true,
      path: "/",
      maxAge: 30 * 60 * 1000,
    });
    return response;
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
