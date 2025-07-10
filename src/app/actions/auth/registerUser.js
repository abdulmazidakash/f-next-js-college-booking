'use server';
import bcrypt from 'bcrypt';
import dbConnect, { collectionNameObject } from "@/lib/dbConnect";

export const registerUser = async(payload)=>{
	const userCollection = dbConnect(collectionNameObject.usersCollection);
	// validation 
	const { email, password } = payload;
	if(!email || !password){
		return { success: false, message: "Email and password are required." };
	}

	const user = await userCollection.findOne({ email: payload.email});

	if(!user){
		const hashPassword = await bcrypt.hash(password, 10);
		payload.password = hashPassword; // Store hashed password
		const result = await userCollection.insertOne(payload);
		result.insertedId = result.insertedId.toString();
		return result;
	}
	return { success: false, message: "User already exists." };
}