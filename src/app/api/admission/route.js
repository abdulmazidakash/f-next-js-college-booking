// app/api/admission/route.js
"use server";

import dbConnect, { collectionNameObject } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const collegeId = formData.get("collegeId");
    const collegeName = formData.get("collegeName");
    const name = formData.get("name");
    const subject = formData.get("subject");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const address = formData.get("address");
    const dob = formData.get("dob");
    const imageFile = formData.get("image"); // This will be a File object or null

    // Basic validation for required fields
    if (!collegeId || !collegeName || !name || !subject || !email || !phone || !address || !dob) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const admissionCollection = await dbConnect(collectionNameObject.admissionCollection);

    // --- Duplicate Admission Check ---
    const existingAdmission = await admissionCollection.findOne({
      email: email,
      collegeId: collegeId,
    });

    if (existingAdmission) {
      return NextResponse.json(
        { error: "You have already applied to this college with this email." },
        { status: 409 }
      );
    }
    // --- End Duplicate Admission Check ---

    let imageUrl = "";
    if (imageFile && imageFile.size > 0) {
      // Convert ArrayBuffer to Buffer
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Convert Buffer to Base64 string for ImgBB upload
      const base64Image = buffer.toString("base64");

      // ImgBB API URL
      const imgbbApiKey = process.env.IMGBB_API_KEY;
      if (!imgbbApiKey) {
        throw new Error("IMGBB_API_KEY is not defined in environment variables.");
      }
      const imgbbUploadUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

      // Prepare FormData for ImgBB (ImgBB expects 'image' field)
      const imgbbFormData = new FormData();
      imgbbFormData.append("image", base64Image); // ImgBB expects base64 string here
      imgbbFormData.append("name", imageFile.name); // Optional: original file name

      const imgbbResponse = await fetch(imgbbUploadUrl, {
        method: "POST",
        body: imgbbFormData, // Use imgbbFormData here
      });

      if (!imgbbResponse.ok) {
        const errorText = await imgbbResponse.text();
        console.error("ImgBB upload failed:", errorText);
        throw new Error(`ImgBB upload failed: ${errorText}`);
      }

      const imgbbResult = await imgbbResponse.json();
      if (imgbbResult.data && imgbbResult.data.url) {
        imageUrl = imgbbResult.data.url; // Get the URL from ImgBB response
      } else {
        throw new Error("ImgBB did not return a valid image URL.");
      }
    }

    const newAdmission = {
      collegeId,
      collegeName,
      name,
      subject,
      email,
      phone,
      address,
      dob,
      image: imageUrl, // Store the ImgBB URL
      createdAt: new Date(),
    };

    const result = await admissionCollection.insertOne(newAdmission);

    return NextResponse.json(
      { message: "Admission submitted successfully", admissionId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting admission:", error);
    return NextResponse.json(
      { error: `Failed to submit admission: ${error.message || "Server error."}` },
      { status: 500 }
    );
  }
}
