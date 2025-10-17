const welcomeEmail = (name) => {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-radius: 8px; color: #333;">
      
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #2B6CB0;">Welcome to Leave Management System</h1>
      </div>

      <p style="font-size: 16px;">Hi <strong>${name}</strong>, 👋</p>

      <p style="font-size: 16px; line-height: 1.5;">
        We’re thrilled to have you on board! Our Leave Management System helps you manage your time off effortlessly and stay on top of your leave balances.
      </p>

      <div style="background-color: #F7FAFC; padding: 15px 20px; border-left: 4px solid #2B6CB0; margin: 20px 0;">
        <p style="margin: 0; font-size: 15px;">
          Here's what you can do right away:
        </p>
        <ul style="margin-top: 10px; padding-left: 20px; font-size: 15px;">
          <li>👤 Employees can register and perform CRUD operations</li>
          <li>📝 Employees can apply for leave</li>
          <li>📜 Employees can check their leave history</li>
          <li>👨‍💼 Department-wise managers can view their employees' leaves</li>
          <li>✅ Department-wise managers can approve or reject leave requests</li>
          <li>🛠️ Admins can approve or reject any leave</li>
          <li>📊 Admins can view all leave statistics: total pending count, approved count, total leave count, and rejected count</li>
        </ul>
      </div>

      <p style="font-size: 16px;">
        To get started, log in to your dashboard:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://yourdomain.com/login" style="background-color: #2B6CB0; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 16px;">Login to Your Account</a>
      </div>

      <p style="font-size: 15px;">
        If you have any questions or need help, feel free to contact our support team at 
        <a href="mailto:support@yourdomain.com" style="color: #2B6CB0;">support@yourdomain.com</a>.
      </p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #e0e0e0;" />

      <p style="font-size: 13px; color: #888; text-align: center;">
        &copy; ${new Date().getFullYear()} Leave Management System. All rights reserved.
      </p>
    </div>
  `;
};

export default welcomeEmail;
