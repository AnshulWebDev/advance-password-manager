import mongoose from "mongoose";

const secureNotesSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  notes: {
    type: String,
  },
});
module.exports = mongoose.model("secureNotes", secureNotesSchema);
