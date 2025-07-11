"use server";

import dbConnect, { collectionNameObject } from "@/lib/dbConnect";

export async function POST(req) {
  const formData = await req.formData();
  const admissionData = {
    name: formData.get("name"),
    subject: formData.get("subject"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    dob: formData.get("dob"),
    image: formData.get("image")?.name || "",
  };
  const serviceCollection = dbConnect("admissionCollection"); // Create new collection
  await serviceCollection.insertOne(admissionData);
  return new Response(JSON.stringify({ message: "Admission submitted" }), { status: 200 });
}