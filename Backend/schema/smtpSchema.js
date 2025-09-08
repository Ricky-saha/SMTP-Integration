const mongoose = require('mongoose');

const smtpConfigSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true,
    unique: true,
  },
  host: {
    type: String,
    required: true
  },
  port: {
    type: Number,
    required: true
  },
  secure: {
    type: Boolean,
    default: false
  },
  user: {
    type: String,
    required: true
  },
  pass: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('SmtpConfig', smtpConfigSchema);
