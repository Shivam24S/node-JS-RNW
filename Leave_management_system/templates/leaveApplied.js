const leaveAppliedEmail = (name, leaveType, startDate, endDate, reason) => {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-radius: 8px; color: #333;">
      
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #2B6CB0;">Leave Request Submitted</h1>
      </div>

      <p style="font-size: 16px;">Hi <strong>${name}</strong>,</p>

      <p style="font-size: 16px; line-height: 1.5;">
        Your leave request has been successfully submitted through the <strong>Leave Management System</strong>.
      </p>

      <div style="background-color: #F7FAFC; padding: 15px 20px; border-left: 4px solid #2B6CB0; margin: 20px 0;">
        <p style="margin: 0; font-size: 15px;"><strong>Leave Details:</strong></p>
        <ul style="list-style: none; padding-left: 0; font-size: 15px; margin-top: 10px;">
          <li><strong>Type:</strong> ${leaveType}</li>
          <li><strong>Start Date:</strong> ${startDate}</li>
          <li><strong>End Date:</strong> ${endDate}</li>
          <li><strong>Reason:</strong> ${reason}</li>
        </ul>
      </div>

      <p style="font-size: 16px;">
        Your request is currently under review and will be processed by your manager or admin shortly. You will receive a notification once it is approved or rejected.
      </p>

      <p style="font-size: 15px;">
        If you have any questions or made a mistake, please contact your manager or reach out to our support team.
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="mailto:support@yourdomain.com" style="background-color: #2B6CB0; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 16px;">Contact Support</a>
      </div>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #e0e0e0;" />

      <p style="font-size: 13px; color: #888; text-align: center;">
        &copy; ${new Date().getFullYear()} Leave Management System. All rights reserved.
      </p>
    </div>
  `;
};

export default leaveAppliedEmail;
