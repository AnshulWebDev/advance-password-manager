import { uniquepasswd } from "../../../../model/uniquepasswd";
import { connectDB } from "../../../../utils/dbconnect";

const uniquePassWdGenerator = (options, length) => {
  let result = "";
  const capital = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const small = "abcdefghijklmnopqrstuvwxyz";
  const specialChar = "!@#$%^&*";
  const number = "0123456789";
  const passwdLength = length;

  const passwdGenerateType = options.split("+");
  const characters = passwdGenerateType.reduce((accumulator, type) => {
    switch (type) {
      case "capital":
        return accumulator + capital;
      case "small":
        return accumulator + small;
      case "special":
        return accumulator + specialChar;
      case "number":
        return accumulator + number;
      default:
        return accumulator;
    }
  }, "");

  for (let i = 0; i < passwdLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};

export const POST = async (req) => {
  try {
    await connectDB();
    const { capital, small, special, number, length } = await req.json();
    const token = await req.cookies.get("token")?.value;
    const passwdDB = await uniquepasswd.find();
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error Try Again" },
      { status: 500 }
    );
  }
};
