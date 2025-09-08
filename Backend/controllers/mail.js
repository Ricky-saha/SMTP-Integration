const createTransporter = require("../utils/nodemailer");
const mailSchema = require("../schema/mailSchema");


const sendMail = async (req, res) => {
  try {
    const { source, emailTo, subject, body } = req.body;

    // validation checks
    if (!source || !emailTo || !subject || !body) {
      return res.status(400).json({
        message: "All fields are mandatory",
      });
    }

    const isValidEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    
    if (!isValidEmail(emailTo)) {
      return res.status(400).json({
      message: "Invalid recipient email address" 
      });
    }

    // Create transporter dynamically (fetch config from DB)
    const transporter = await createTransporter(source);
    console.log(transporter);
    console.log(transporter.options.auth.user);

    // Send email
    const info = await transporter.sendMail({
      from: transporter.options.auth.user,
      to: emailTo,
      subject:subject,
      text: body,
    });

    console.log("Email info:", info);

    // Determine status based on actual acceptance
    const status = info.accepted.length > 0 ? "sent" : "failed";

    // Optional: Save in DB if you want to track sent emails
    
    const new_mail = await mailSchema.create({
      source,
      emailFrom: transporter.options.auth.user,
      emailTo,
      subject,
      body,
      status,
    });
    

    res.status(200).json({
      message: "Email processed successfully",
      status,
      info,
    });

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      message: "Email sending failed",
      error: error.message,
    });
  }
};

module.exports = sendMail;






