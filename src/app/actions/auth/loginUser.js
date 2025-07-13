// app/actions/auth/loginUser.js
'use server'
import dbConnect, { collectionNameObject } from '@/lib/dbConnect';
import bcrypt from 'bcrypt';

export const loginUser = async(payload)=>{
	const { email, password } = payload;

	const userCollection = await dbConnect(collectionNameObject.usersCollection);
	const user = await userCollection.findOne({ email }); 
	console.log('user found in loginUser --->', user); // Debug log

	if(!user){
		console.log('User not found for email:', email);
		return null; // Return null if user not found
	}
	
	const isPasswordOK = await bcrypt.compare(password, user.password);
	console.log('Password comparison result:', isPasswordOK); // Debug log

	if(!isPasswordOK){
		return null; // Return null if password doesn't match
	}

	// IMPORTANT: NextAuth expects an 'id' property on the user object.
	// Convert MongoDB's _id to a string and assign it to 'id'.
	// Also, explicitly remove the 'password' field before returning the user object.
	const { password: hashedPassword, ...userWithoutPassword } = user; // Destructure to remove password
	userWithoutPassword.id = user._id.toString(); // Add 'id' property as a string

	return userWithoutPassword; // Return user object without password and with 'id'
}
