import mongoose from "mongoose";

const backupCodeSchema = new mongoose({
  codeOne: {
    type: Number,
  },
  codeOneUsed: {
    type: Boolean,
    default: false,
  },
  codetwo: {
    type: Number,
  },
  codetwoUsed: {
    type: Boolean,
    default: false,
  },
  codeThree: {
    type: Number,
  },
  codeThreeUsed: {
    type: Boolean,
    default: false,
  },
  codeFour: {
    type: Number,
  },
  codeFourUsed: {
    type: Boolean,
    default: false,
  },
  codeFive: {
    type: Number,
  },
  codeFiveUsed: {
    type: Boolean,
    default: false,
  },
  codeSix: {
    type: Number,
  },
  codeSixUsed: {
    type: Boolean,
    default: false,
  },
});

export const backupCode = mongoose.model("backupCode", backupCodeSchema);
