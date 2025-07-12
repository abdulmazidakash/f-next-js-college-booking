// app/api/admission/route.js
"use server";

import dbConnect, { collectionNameObject } from "@/lib/dbConnect";
import { writeFile } from "fs/promises"; // For saving images temporarily (not for production)
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image"); // Get the file object

    let imagePath = "";
    if (imageFile && imageFile.size > 0) { // Check if a file was actually uploaded
      // This is a very basic way to save files. For production, use cloud storage.
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const filename = `${Date.now()}-${imageFile.name.replace(/\s/g, "_")}`;
      // Define a path where images will be stored (e.g., public/uploads)
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      // Ensure the directory exists (you might need 'fs.mkdir' for production)
      // For simplicity, assume 'public/uploads' exists or handle its creation.
      imagePath = `/uploads/${filename}`;
      await writeFile(path.join(uploadDir, filename), buffer);
    }

    const admissionData = {
      collegeId: formData.get("collegeId"),
      collegeName: formData.get("collegeName"), // Store college name for easier display
      name: formData.get("name"),
      subject: formData.get("subject"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      dob: formData.get("dob"),
      image: imagePath, // Store the path to the saved image
      createdAt: new Date(), // Add timestamp
    };

    // Basic validation
    if (!admissionData.collegeId || !admissionData.name || !admissionData.email || !admissionData.dob) {
      return new Response(JSON.stringify({ error: "Missing required admission fields." }), { status: 400 });
    }

    // Ensure `collectionNameObject.admissionCollection` is defined in your `dbConnect` setup
    // If not, you might define it like: `export const collectionNameObject = { ..., admissionCollection: "admissions" };`
    const admissionCollection = dbConnect(collectionNameObject.admissionCollection); 
    const result = await admissionCollection.insertOne(admissionData);

    return new Response(JSON.stringify({ message: "Admission submitted successfully", id: result.insertedId }), {
      status: 201, // 201 Created
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error submitting admission:", error);
    return new Response(JSON.stringify({ error: "Failed to submit admission" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}