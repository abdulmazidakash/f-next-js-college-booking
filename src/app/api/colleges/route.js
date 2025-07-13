// app/api/colleges/route.js
"use server";

import dbConnect, { collectionNameObject } from "@/lib/dbConnect";
import { NextResponse } from "next/server"; // Import NextResponse
// No need for fs/promises, path as we are using ImgBB

export async function GET() {
  try {
    const collegeCollection = await dbConnect(collectionNameObject.collegeCollection);
    const colleges = await collegeCollection.find({}).toArray();

    // Ensure _id is converted to string for client-side consumption
    const processedColleges = colleges.map(college => ({
      ...college,
      _id: college._id.toString()
    }));

    return NextResponse.json(processedColleges, { status: 200 });
  } catch (error) {
    console.error("Error fetching colleges:", error);
    return NextResponse.json({ error: "Failed to fetch colleges" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData(); // Use formData() for file uploads

    const name = formData.get("name");
    const imageFile = formData.get("image"); // Get the file object
    const admissionDates = formData.get("admissionDates");
    const researchCount = formData.get("researchCount");
    const events = formData.get("events");
    const sports = formData.get("sports");

    // Validate required fields
    if (!name || !imageFile || !admissionDates || !researchCount) {
      return NextResponse.json({ error: "Missing required fields (Name, Image, Admission Dates, Research Count)." }, { status: 400 });
    }

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
    } else {
        // If imageFile is missing or empty, return an error as image is required
        return NextResponse.json({ error: "Image file is required." }, { status: 400 });
    }

    const collegeCollection = await dbConnect(collectionNameObject.collegeCollection);
    const newCollege = {
      name,
      image: imageUrl, // Store the ImgBB URL
      admissionDates,
      researchCount: parseInt(researchCount),
      events: events ? events.split(",").map((event) => event.trim()) : [],
      sports: sports ? sports.split(",").map((sport) => sport.trim()) : [],
      createdAt: new Date(),
    };

    const result = await collegeCollection.insertOne(newCollege);

    return NextResponse.json({ message: "College added", id: result.insertedId.toString() }, { status: 201 });
  } catch (error) {
    console.error("Error adding college:", error);
    return NextResponse.json({ error: `Failed to add college: ${error.message || "Server error."}` }, { status: 500 });
  }
}
