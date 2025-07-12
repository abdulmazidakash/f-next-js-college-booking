// lib/emailService.js
import nodemailer from 'nodemailer';

// Configure your email transporter using SMTP details
// These details should come from your .env.local file for security
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587'), // Default to 587 if not set
  secure: process.env.EMAIL_SERVER_PORT === '465', // Use true for 465 (SSL/TLS), false for 587 (STARTTLS)
  auth: {
    user: process.env.EMAIL_SERVER_USER, // Your email address
    pass: process.env.EMAIL_SERVER_PASSWORD, // Your email password or app-specific password
  },
});

/**
 * Sends a password reset email to the user.
 * @param {string} toEmail - The recipient's email address.
 * @param {string} resetToken - The unique token for password reset.
 * @returns {Promise<boolean>} True if email sent successfully, false otherwise.
 */
export async function sendPasswordResetEmail(toEmail, resetToken) {
  // Construct the full reset link using your app's base URL
  const resetLink = `${process.env.NEXT_API_URL}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM, // Sender email address
    to: toEmail, // Recipient email address
    subject: 'Password Reset Request for Your College Booking Account', // Email subject
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #0056b3;">Password Reset Request</h2>
        <p>You have requested to reset the password for your account.</p>
        <p>Please click on the link below to reset your password:</p>
        <p style="margin: 20px 0;">
          <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">Reset Your Password</a>
        </p>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Thank you,<br>Your College Booking Team</p>
      </div>
    `, // HTML content for the email body
  };

  try {
    await transporter.sendMail(mailOptions); // Send the email
    console.log(`Password reset email sent to ${toEmail}`);
    return true;
  } catch (error) {
    console.error(`Error sending password reset email to ${toEmail}:`, error);
    return false;
  }
}
