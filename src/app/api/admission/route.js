// app/api/admission/route.js
"use server";

import dbConnect, { collectionNameObject } from "@/lib/dbConnect";
import { writeFile, mkdir } from "fs/promises"; // Import mkdir from fs/promises
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image"); // Get the file object

    let imagePath = "";
    if (imageFile && imageFile.size > 0) { // Check if a file was actually uploaded
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const filename = `${Date.now()}-${imageFile.name.replace(/\s/g, "_")}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");

      // --- IMPORTANT FIX 1: Ensure upload directory exists ---
      // This will create the directory if it doesn't exist
      await mkdir(uploadDir, { recursive: true });

      imagePath = `/uploads/${filename}`;
      await writeFile(path.join(uploadDir, filename), buffer);
    }

    const admissionData = {
      collegeId: formData.get("collegeId"),
      collegeName: formData.get("collegeName"),
      name: formData.get("name"),
      subject: formData.get("subject"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      dob: formData.get("dob"),
      image: imagePath, // Store the path to the saved image
      createdAt: new Date(),
    };

    // Basic validation
    if (!admissionData.collegeId || !admissionData.name || !admissionData.email || !admissionData.dob) {
      return new Response(JSON.stringify({ error: "Missing required admission fields." }), { status: 400 });
    }

    // --- IMPORTANT FIX 2: Await dbConnect ---
    // dbConnect is now an async function, so you must await its result
    const admissionCollection = await dbConnect(collectionNameObject.admissionCollection);
    const result = await admissionCollection.insertOne(admissionData);

    return new Response(JSON.stringify({ message: "Admission submitted successfully", id: result.insertedId }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error submitting admission:", error);
    // Provide a more specific error message if possible, or log the full error
    return new Response(JSON.stringify({ error: "Failed to submit admission. Please check server logs for details." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
