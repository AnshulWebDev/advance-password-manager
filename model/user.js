import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  isEmailVerify: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
  },
  profileImg: {
    type: String,
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
