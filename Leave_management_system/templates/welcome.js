const welcomeEmailTemplate = (name) => {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 30px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
        <tr>
          <td style="background-color: #004aad; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0;">Welcome to LMS</h1>
            <p style="color: #ffffff; margin: 5px 0 0;">Leave Management System</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px;">
            <h2 style="color: #333333;">Hello ${name},</h2>
            <p style="color: #555555; font-size: 16px; line-height: 1.6;">
              Your account has been successfully created on our Leave Management System. You can now apply for leaves, track your balances, and manage your time more efficiently.
            </p>

            <p style="color: #555555; font-size: 16px; line-height: 1.6;">
              Use the button below to access your dashboard and get started.
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://your-lms-domain.com/login" target="_blank"
                style="background-color: #004aad; color: #ffffff; text-decoration: none; padding: 14px 24px; border-radius: 5px; font-size: 16px; display: inline-block;">
                Go to Dashboard
              </a>
            </div>

            <p style="color: #999999; font-size: 14px;">
              If you have any issues accessing your account, please contact your HR or system administrator.
            </p>

            <p style="color: #555555; font-size: 16px; margin-top: 30px;">
              Regards,<br>
              <strong>LMS Support Team</strong>
            </p>
          </td>
        </tr>
        <tr>
          <td style="background-color: #f0f0f0; text-align: center; padding: 20px; font-size: 12px; color: #888888;">
            &copy; ${new Date().getFullYear()} Leave Management System. All rights reserved.
          </td>
        </tr>
      </table>
    </div>
  `;
};

export default welcomeEmailTemplate;
