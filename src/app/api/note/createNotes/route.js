import { NextResponse } from "next/server";
import { connectDB } from "../../../../../utils/dbconnect";
import { user as User } from "../../../../../model/user";
import { secureNotes } from "../../../../../model/secureNotes";
import CryptoJS from "crypto-js";
import bcrypt from "bcrypt";
export const POST = async (req) => {
  try {
    await connectDB();
    const { name, note, favorite, vaultPin } = await req.json();
    const token = await req.cookies.get("token")?.value;
    if (!name) {
      return NextResponse.json(
        { success: false, message: "enter note name" },
        { status: 422 }
      );
    } else if (!note) {
      return NextResponse.json(
        { success: false, message: "note will not be empty" },
        { status: 422 }
      );
    } else if (!vaultPin || vaultPin.toString().length !== 6) {
      return NextResponse.json(
        { success: false, message: "Enter a 6-digit number vault pin" },
        { status: 422 }
      );
    }
    const user = await User.findOne({ token });
    if (!user._id) {
      return NextResponse.redirect("/login");
    }
    if (!user.vaultPin) {
      return NextResponse.json(
        { success: false, message: "create 6 digit vault pin" },
        { status: 422 }
      );
    }
    if (!(await bcrypt.compare(vaultPin, user.vaultPin))) {
      return NextResponse.json(
        { success: false, message: "Vault pin is incorrect" },
        { status: 402 }
      );
    }
    const encryptNote = CryptoJS.AES.encrypt(note, vaultPin).toString();
    const newNote = await secureNotes.create({
      name,
      notes: encryptNote,
      favorite: favorite ? true : false,
    });
    await User.findByIdAndUpdate(
      user._id,
      {
        $push: { secureNotes: newNote._id },
      },
      { new: true }
    );
    return NextResponse.json(
      {
        success: true,
        message: "Note added successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { success: false, message: "Internal server error Try Again" },
      { status: 500 }
    );
  }
};
