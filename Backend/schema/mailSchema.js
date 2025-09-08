const mongoose = require ("mongoose");

const mailSchema = mongoose.Schema({
  source: {
    type: String,
    enum: ["gmail", "zoho", "elastic", "sendgrid"],
    required: true,
  },

  emailFrom: {
    type: String,
    required: true 
    },

  emailTo: {
    type: String,
    required: true 
    },

  subject: { 
    type: String,
    required: true 
    },

  body: {
    type: String,
    required: true
    },

  status: {
    type: String,
    enum: ["sent", "failed"],
    default: "sent" },

  createdAt: { 
    type: Date,
    default: Date.now 
},
});

module.exports = mongoose.model("Mail", mailSchema);

