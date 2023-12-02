import mongoose from "mongoose";

const passwordVault = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    select: false,
  },
  website: {
    type: String,
    trim: true,
  },
});
module.exports = mongoose.model("passwordVault", passwordVault);
