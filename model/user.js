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
  passwordVault: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "passwordVault",
  },
  twoFactorAuth: {
    type: Boolean,
    default: false,
  },
  backupCode:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "backupCode",
  },
  token: {
    type: String,
  },
});
module.exports = mongoose.model("user", userSchema);
