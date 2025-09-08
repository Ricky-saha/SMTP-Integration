const createTransporter = require("../utils/nodemailer");
const mailSchema = require("../schema/mailSchema");

const sendMail = async (req, res) => {
  try {
    const { source, emailFrom, emailTo, subject, body } = req.body;

    // validation checks

    if(!source || !emailFrom || ! emailTo || !subject || !body){
      res.status(502).json({
      message: "All fields are mandatory"
    });
    }
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

    if (!isValidEmail(emailTo)) {
      return res.status(400).json({ message: "Invalid recipient email address" });
    }

    // Create transporter
    const transporter = createTransporter(source);

    // Send email
    const info = await transporter.sendMail({
      from: emailFrom,
      to: emailTo,
      subject:subject,
      text: body,
    });

    console.log(info);

    // Determine status based on actual acceptance
    const status = info.accepted.length > 0 ? "sent" : "failed";

    // Save in DB
    const new_mail = await mailSchema.create({
      source,
      emailFrom,
      emailTo,
      subject,
      body,
      status,
    });

    res.status(200).json({
      message: "Email processed",
      new_mail,
      
    });

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      message: "Email sending failed",
      error,
    });
  }
};

module.exports = sendMail;
