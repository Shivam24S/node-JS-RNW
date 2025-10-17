const accountDeletedEmail = (name) => {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-radius: 8px; color: #333;">
      
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #2B6CB0;">Account Deletion Confirmation</h1>
      </div>

      <p style="font-size: 16px;">Hi <strong>${name}</strong>,</p>

      <p style="font-size: 16px; line-height: 1.5;">
        This email is to confirm that your account on the <strong>Leave Management System</strong> has been successfully deleted.
      </p>

      <div style="background-color: #F7FAFC; padding: 15px 20px; border-left: 4px solid #2B6CB0; margin: 20px 0;">
        <p style="margin: 0; font-size: 15px;">
          All your personal data and leave records have been removed from our system as per our data handling and privacy policies.
        </p>
      </div>

      <p style="font-size: 16px;">
        If this action was a mistake or you wish to reactivate your account, please contact our support team as soon as possible.
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="mailto:support@yourdomain.com" style="background-color: #2B6CB0; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 16px;">Contact Support</a>
      </div>

      <p style="font-size: 15px;">
        Thank you for being a part of our system. We hope to see you again in the future.
      </p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #e0e0e0;" />

      <p style="font-size: 13px; color: #888; text-align: center;">
        &copy; ${new Date().getFullYear()} Leave Management System. All rights reserved.
      </p>
    </div>
  `;
};

export default accountDeletedEmail;
