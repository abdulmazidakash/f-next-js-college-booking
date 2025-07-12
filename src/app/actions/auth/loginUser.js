// app/actions/auth/loginUser.js
'use server'
import dbConnect, { collectionNameObject } from '@/lib/dbConnect';
import bcrypt from 'bcrypt';

export const loginUser = async(payload)=>{
	const { email, password } = payload;

	// Await dbConnect call
	const userCollection = await dbConnect(collectionNameObject.usersCollection);
	const user = await userCollection.findOne({ email }); 
	
	// Corrected: Return null if user not found
	if(!user){
		return null; 
	}
	
	// Corrected: bcrypt.compare(plainTextPassword, hashedPassword)
	const isPasswordOK = await bcrypt.compare(password, user.password); // Correct order
	
	// Corrected: Return null if password doesn't match
	if(!isPasswordOK){
		return null; 
	}

	// Important: NextAuth expects an 'id' property on the user object.
	// Convert MongoDB's _id to a string and assign it to 'id'.
	user.id = user._id.toString(); 
	return user;
}