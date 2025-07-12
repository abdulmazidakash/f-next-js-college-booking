// app/api/auth/reset-password/route.js
"use server"; // This is a server-side API route

import dbConnect, { collectionNameObject } from "@/lib/dbConnect"; // Your database connection
import bcrypt from 'bcrypt'; // For hashing passwords

export async function POST(request) {
  try {
    const { token, newPassword } = await request.json(); // Get token and new password from request body

    if (!token || !newPassword) {
      return new Response(JSON.stringify({ error: "Token and new password are required" }), { status: 400 });
    }

    // Connect to the users collection
    const userCollection = await dbConnect(collectionNameObject.usersCollection);
    
    // Find the user by the reset token and ensure the token has not expired
    const user = await userCollection.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }, // Check if expiry timestamp is greater than current time
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid or expired password reset token." }), { status: 400 });
    }

    // Hash the new password before storing it
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and remove the reset token fields from their document
    await userCollection.updateOne(
      { _id: user._id }, // Find the user by their MongoDB _id
      {
        $set: { password: hashedPassword }, // Set the new hashed password
        $unset: { resetToken: "", resetTokenExpiry: "" }, // Remove reset token fields for security
      }
    );

    return new Response(JSON.stringify({ message: "Password has been reset successfully." }), { status: 200 });

  } catch (error) {
    console.error("Error in reset password API:", error);
    return new Response(JSON.stringify({ error: "Internal server error." }), { status: 500 });
  }
}
