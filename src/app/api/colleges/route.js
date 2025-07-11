"use server";

import dbConnect, { collectionNameObject } from "@/lib/dbConnect";

export async function GET() {
  const serviceCollection = dbConnect(collectionNameObject.collegeCollection);
  const colleges = await serviceCollection.find({}).toArray();
  return new Response(JSON.stringify(colleges), { status: 200 });
}