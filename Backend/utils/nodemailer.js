const nodemailer = require("nodemailer");

const createTransporter = (source) => {
  switch (source) {
    case "gmail":
      return nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS, 
        },
      });

    case "zoho":
      return nodemailer.createTransport({
        host: 'smtp.zoho.in',
    secure: true,
    port: 465,
        auth: {
          user: process.env.ZOHO_USER,
          pass: process.env.ZOHO_PASS,
        },
      });
    
    case "elastic":
      return nodemailer.createTransport({
        host: "smtp.elasticemail.com",
        port: 2525,
        auth: {
          user: process.env.ELASTIC_USER,
          pass: process.env.ELASTIC_PASS,
        },
        tls: {
      rejectUnauthorized: false
      }
      });

    default:
      throw new Error("Invalid email source");
  }
};

module.exports = createTransporter;
