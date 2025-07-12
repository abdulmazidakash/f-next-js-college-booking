// app/actions/auth/registerUser.js
'use server';
import bcrypt from 'bcrypt';
import dbConnect, { collectionNameObject } from "@/lib/dbConnect";

export const registerUser = async(payload)=>{
	// Await dbConnect call
	const userCollection = await dbConnect(collectionNameObject.usersCollection);
	
	// validation 
	const { email, password } = payload;
	if(!email || !password){
		return { acknowledged: false, message: "Email and password are required." };
	}

	const user = await userCollection.findOne({ email: payload.email});

	if(!user){
		const hashPassword = await bcrypt.hash(password, 10);
		payload.password = hashPassword; // Store hashed password
		const result = await userCollection.insertOne(payload);
		
		// Ensure insertedId is returned as a string for consistency
		result.insertedId = result.insertedId.toString(); 
		return result;
	}
	return { acknowledged: false, message: "User already exists." };
}