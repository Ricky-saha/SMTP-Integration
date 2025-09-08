


# SMTP Email Service – Flow Overview

This service manages SMTP configurations and sends emails based on the selected source.

---

## Flow

1. **Store SMTP Configs**

   * Save configurations for Gmail, Zoho, Elastic, SendGrid, Outlook in MongoDB.

2. **Create SMTP Config**

   * Endpoint: `POST /api/smtp/create-smtp`
   * Body Example:

     ```json
     {
       "source": "gmail",
       "host": "smtp.gmail.com",
       "port": 587,
       "secure": false,
       "user": "rickysahawork@gmail.com",
       "pass": "vtgombeorswwztxv"
     }
     ```
   * Saves the SMTP configuration in the database.

3. **Update SMTP Config**

   * Endpoint: `PUT /api/smtp/update-smtp/{source}`
   * Body Example (only include fields to update):

     ```json
     {
       "host": "smtp.jeemail.com",
       "port": 255,
       "secure": true,
       "user": "rickysahawork@jeemail.com",
       "pass": "mekijmogjrrsfuqh"
     }
     ```
   * Updates the existing configuration in the database.

4. **Delete SMTP Config**

   * Endpoint: `DELETE /api/smtp/delete-smtp/{source}`
   * Deletes the SMTP configuration from the database.

5. **Send Email Request**

   * Endpoint: `POST /api/mail/send`
   * User sends a request via Postman with:

     ```json
     {
       "source": "gmail",
       "emailTo": "saharicky20@gmail.com",
       "subject": "Test Email from Node.js",
       "body": "Hello! Test mail from updated implementations."
     }
     ```

6. **Fetch Config & Send**

   * Service fetches SMTP config for the selected source.
   * Uses Nodemailer to send the email.

7. **Email Sent & Response Stored**

   * Email is delivered successfully.
   * The  payload  is stored in MongoDB for reference.

---

