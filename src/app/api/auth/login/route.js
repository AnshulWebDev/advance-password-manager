import { NextResponse } from "next/server";
import { User } from "../../../../../model/user";
import { connectDB } from "../../../../../utils/dbconnect";
import validator from "validator";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

export const POST = async (req) => {
  try {
    await connectDB();
    const { email, password } = await req.json();
    const user = await User.findOne({ email: email }).select("+password");
    if (!validator.isEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Enter valid email id.",
        },
        { status: 401 }
      );
    } else if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "user not found. Please register first",
        },
        { status: 404 }
      );
    } else if (user.accountLock) {
      return NextResponse.json(
        {
          success: false,
          message: "Your Accout is locked contact admin@devglimpse.com",
        },
        { status: 402 }
      );
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      if (
        user.wrongPasswdAttempt.attempts === 4 &&
        user.wrongPasswdAttempt.lastAttemptTime
      ) {
        user.accountLock = true;
        await user.save();
        return NextResponse.json(
          {
            success: false,
            message: "Your Accout is locked contact admin@devglimpse.com",
          },
          { status: 402 }
        );
      } else if (user.wrongPasswdAttempt.lastAttemptTime) {
        user.wrongPasswdAttempt.attempts += 1;
        await user.save();
        return NextResponse.json(
          {
            success: false,
            message: `wrong password you left ${user.wrongPasswdAttempt.attempts} out of 4 chance`,
          },
          { status: 404 }
        );
      }
    } else {
      const response = NextResponse.json(
        { success: true, message: `Welcome back ${user.firstName}` },
        { status: 200 }
      );
      const payload = {
        email: user.email,
        id: user._id,
      };
      const token = Jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "6h",
      });
      user.token = token;
      await user.save();
      response.cookies.set({
        name: "token",
        value: token,
        httpOnly: true,
        path: "/",
        maxAge: 6 * 60 * 60 * 1000,
      });
      return response;
    }
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
