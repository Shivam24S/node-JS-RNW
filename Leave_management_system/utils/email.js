import dotenv from "dotenv";

dotenv.config({ path: "../env/.dev.env" });

import nodemailer from "nodemailer";

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "shivams2472@gmail.com",
    pass: "jhun ahwz upmq aehw",
  },
});

// // Wrap in an async IIFE so we can use await.
// (async () => {
//   const info = await transporter.sendMail({
//     from: '"Leave management system" <process.env.GMAIL_USER>',
//     to: "bar@example.com, baz@example.com",
//     subject: "Hello ✔",
//     text: "Hello world?", // plain‑text body
//     html: "<b>Hello world?</b>", // HTML body
//   });

//   console.log("Message sent:", info.messageId);
// })();

const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: '"Leave management system" <process.env.GMAIL_USER>',
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.log(error.message);
  }
};

export default sendEmail;
