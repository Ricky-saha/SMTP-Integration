const mongoose = require ("mongoose")
const smtpConfigSchema = require("../schema/smtpSchema");


// creating an stmp config
const createSmtpConfig = async (req, res) => {
  try {
    const {
      source,
      host,
      port,
      secure,
      user,
      pass } = req.body;

    // Check if config for this source already exists
    const existingConfig = await smtpConfigSchema.findOne({ source });
    
    if (existingConfig) {
      return res.status(400).json({
        message: "SMTP config for this source already exists"
        });
    }


    // creating a new entry in the db
    const config = await smtpConfigSchema.create({
      source,
      host,
      port,
      secure,
      user,
      pass
      });

    res.status(201).json({
    message: "SMTP config created successfully", config
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
    message: "Error creating SMTP config", error 
    });
  }
};

// Updating an smtp Config
const updateSmtpConfig = async (req, res) => {
  try {
    const { source } = req.params;
    const updates = req.body;

    const updatedConfig = await smtpConfigSchema.findOneAndUpdate(
      { source },
      updates,
      { new: true });

    if (!updatedConfig) {
      return res.status(404).json({
      message: "SMTP config for this source not found"
     });
    }

    res.status(200).json({
      message: "SMTP config updated successfully",
      updatedConfig });

  } catch (error) {
    console.error(error);
    res.status(500).json({
    message: "Error updating SMTP config", error });
  }
};

// deleting an smtp config

const deleteSmtpConfig = async (req, res) => {
  try {
    const { source } = req.params; 

    const deletedConfig = await smtpConfigSchema.findOneAndDelete({ source });

    if (!deletedConfig) {
      return res.status(404).json({
        message: "SMTP config for this source not found"
      });
    }

    res.status(200).json({
      message: "SMTP config deleted successfully",
      deletedConfig
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting SMTP config",
      error
    });
  }
};

module.exports = deleteSmtpConfig;

module.exports = {createSmtpConfig,updateSmtpConfig,deleteSmtpConfig};
