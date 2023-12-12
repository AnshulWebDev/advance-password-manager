import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const url = new URL(req.url);
    const name = url.searchParams.get("name");

    console.log(name);
    return NextResponse.json(
      { success: true, message: "Success" },
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
