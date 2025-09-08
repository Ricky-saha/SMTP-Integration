const express = require("express");
const {createSmtpConfig, updateSmtpConfig, deleteSmtpConfig} = require("../controllers/smtpConfig");

const smtpRouter = express.Router();

smtpRouter.post("/create-smtp",createSmtpConfig );
smtpRouter.put("/update-smtp/:source",updateSmtpConfig );
smtpRouter.delete("/delete-smtp/:source",deleteSmtpConfig)

module.exports = smtpRouter;
