const mongoose = require("mongoose");

const emailVerifyTokenSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  token: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 15 * 60,
  },
});
module.exports = mongoose.model("emailVerifyToken", emailVerifyTokenSchema);
