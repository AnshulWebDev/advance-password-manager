import { NextResponse } from "next/server";
import { connectDB } from "../../../../../../utils/dbconnect";
import { user } from "../../../../../../model/user";
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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    //check input validation is in correct format
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields." },
        { status: 422 }
      );
    } else if (!validator.isAlpha(firstName, "en-US", { ignore: " " })) {
      // Use isAlpha from the validator library to check if the name contains only alphabets
      return NextResponse.json(
        {
          success: false,
          message: "first name should only contain alphabets.",
        },
        { status: 422 }
      );
    } else if (!validator.isAlpha(lastName, "en-US", { ignore: " " })) {
      // Use isAlpha from the validator library to check if the name contains only alphabets
      return NextResponse.json(
        { success: false, message: "last name should only contain alphabets." },
        { status: 422 }
      );
    } else if (confirmPassword.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password is too short. minimum length is 8.",
        },
        { status: 422 }
      );
    } else if (!passwordRegex.test(password)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Password must contain at least one lowercase letter, one uppercase letter, and one special symbol.",
        },
        { status: 422 }
      );
    } else if (confirmPassword !== password) {
      return NextResponse.json(
        {
          success: false,
          message: "Password and Confirm Password is not equal.",
        },
        { status: 422 }
      );
    } else if (!validator.isEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Enter valid email id.",
        },
        { status: 422 }
      );
    }

    //check if user is already registered or not
    const finduser = await user.findOne({ email: email });
    if (finduser) {
      return NextResponse.json(
        { success: false, message: "Email is already registered" },
        { status: 422 }
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
      `
      <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    /* Add your styles here */
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
      color: #262626;
    }

    p {
      font-size: 16px;
      line-height: 1.5;
      color: #262626;
    }

    .otp {
      display: inline-block;
      padding: 8px 16px;
      font-size: 18px;
      font-weight: bold;
      background-color: #1a82e2;
      color: #fff;
      border-radius: 4px;
    }

    .footer {
      border-top: 2px solid #ccc;
      padding-top: 20px;
      margin-top: 20px;
    }
  </style>
</head>

<body>

  <div class="container">
    <h1>Email Verification</h1>
    <p>Thank you for signing up with CipherGuard. To complete your registration, please use the following One-Time Password (OTP):</p>

    <p class="otp">${OTP}</p>

    <p>This OTP is valid for 15 minutes. Do not share it with anyone for security reasons.</p>
    <p>If you did not sign up for CipherGuard, please ignore this email.</p>

    <div class="footer">
      <p>Best,<br><a href="https://devglimpse.com" target="_blank">The CipherGuard team</a></p>
    </div>
  </div>

</body>

</html>

      `
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
    // if (
    //   error.message === "Body is unusable" ||
    //   "Unexpected end of JSON input"
    // ) {
    //   return NextResponse.json(
    //     { success: false, message: "Data can't be empty" },
    //     { status: 406 }
    //   );
    // }
    return NextResponse.json(
      { success: false, message: "Internal server error Try Again" },
      { status: 500 }
    );
  }
};
