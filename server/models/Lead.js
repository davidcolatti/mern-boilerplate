const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leadSchema = new Schema({
  spid: Number,
  businessName: String,
  phoneNumber: String,
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

const Lead = mongoose.model("Lead", leadSchema);

module.exports = Lead;
