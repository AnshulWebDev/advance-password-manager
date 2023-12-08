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
  token: {
    type: String,
  },
  wrongPasswdAttempt: {
    attempts: {
      type: Number,
      default: 0,
    },
    lastAttemptTime: {
      type: Date,
      default: Date.now(),
    },
  },
  accountLock: {
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
});

mongoose.models = {};
export const user = mongoose.model("user", userSchema);
