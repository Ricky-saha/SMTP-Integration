# SMTP Email Service – Flow Overview

This service manages SMTP configurations and sends emails based on the selected source.

---

## Flow

1. **Store SMTP Configs**

   * Save configurations for Gmail, Zoho, Elastic, Outlook in MongoDB.And then fetch details for particular smtp source and send mails.

2. **Create SMTP Config**

   * Endpoint: `POST /smtp`
   * Body Example:

     ```json
     {
       "source": "Gmail",
       "host": "smtp.gmail.com",
       "port": 465,
       "secure": true,
       "user": "example@gmail.com",
       "pass": "yourpassword"
     }
     ```
   * Saves the SMTP configuration in the database 

3. **Update SMTP Config**

   * Body Example

     ```json
     {
       "host": "smtp.newhost.com",
       "port": 587
     }
     ```
   * Updates the existing configuration in the database.

4. **Send Email Request**

   * User sends a request via Postman with:

     ```json
     {
       "source": "Gmail",
       "emailFrom": "...",
       "emailTo": "...",
       "subject": "...",
       "body": "..."
     }
     ```

5. **Fetch Config & Send**

   * Service fetches SMTP config for the selected source.
   * Uses Nodemailer to send the email.


* Only SMTP **configurations** are stored, not sent emails.
* Passwords are **securely encrypted**, not hashed.
* Supports multiple email providers dynamically.


