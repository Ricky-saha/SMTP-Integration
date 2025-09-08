const express = require("express");
const sendMail = require("../controllers/mail")

const Mailrouter = express.Router();

// POST /api/email/send
Mailrouter.post("/send", sendMail);

module.exports = Mailrouter;
