import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  isEmailVerify: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    trim: true,
    select: false,
  },
  profileImg: {
    type: String,
    trim: true,
  },
  twoFactorAuth: {
    type: Boolean,
    default: false,
  },
  passwordVault: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "passwordVault",
  },
  secureNotes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "secureNotes",
  },
  backupCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "backupCode",
  },
  token: {
    type: String,
    default: Date.now(),
    expires: 6 * 60 * 60,
  },
  // accountType: {
  //   type: String,
  //   default: "user",
  //   select: false,
  // },
});
mongoose.models = {};
export const User = mongoose.model("user", userSchema);
