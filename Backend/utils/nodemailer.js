const nodemailer = require("nodemailer");
const smtpSchema = require("../schema/smtpSchema"); 

const createTransporter = async (source) => {

  // Fetch SMTP config from MongoDB
  const config = await smtpSchema.findOne({ source: source });
  if (!config) {
    throw new Error("Invalid email source")
  };
  

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    tls: config.tls || {},
  });
};

module.exports = createTransporter;
