// app/api/auth/forgot-password/route.js
"use server"; // This is a server-side API route

import dbConnect, { collectionNameObject } from "@/lib/dbConnect"; // Your database connection
import { sendPasswordResetEmail } from "@/lib/emailService"; // Your email sending utility
import crypto from 'crypto'; // Node.js built-in module for generating random tokens

export async function POST(request) {
  try {
    const { email } = await request.json(); // Get the email from the request body

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
    }

    // Connect to the users collection
    const userCollection = await dbConnect(collectionNameObject.usersCollection);
    const user = await userCollection.findOne({ email }); // Find the user by email

    if (!user) {
      // IMPORTANT SECURITY NOTE: For security, always return a generic success message
      // even if the email is not found. This prevents attackers from guessing valid emails.
      console.warn(`Forgot password request for non-existent email: ${email}`);
      return new Response(JSON.stringify({ message: "If an account with that email exists, a password reset link has been sent." }), { status: 200 });
    }

    // Generate a secure, URL-safe random token
    const resetToken = crypto.randomBytes(32).toString('hex'); // 32 bytes = 64 hex characters
    // Set token expiry (e.g., 1 hour from now)
    const resetTokenExpiry = Date.now() + 3600000; // Current timestamp + 1 hour in milliseconds

    // Update the user's document in the database with the new token and its expiry
    await userCollection.updateOne(
      { _id: user._id }, // Find the user by their MongoDB _id
      { $set: { resetToken, resetTokenExpiry } } // Set the resetToken and resetTokenExpiry fields
    );

    // Send the password reset email using your email service
    const emailSent = await sendPasswordResetEmail(email, resetToken);

    if (emailSent) {
      return new Response(JSON.stringify({ message: "Password reset link sent to your email." }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "Failed to send password reset email." }), { status: 500 });
    }

  } catch (error) {
    console.error("Error in forgot password API:", error);
    return new Response(JSON.stringify({ error: "Internal server error." }), { status: 500 });
  }
}
