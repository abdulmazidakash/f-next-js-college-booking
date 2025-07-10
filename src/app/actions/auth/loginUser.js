'use server'
import bcrypt from 'bcrypt';
import dbConnect, { servicesObj } from "@/lib/dbConnect";

export const loginUser = async(payload)=>{
	const { email, password } = payload;

	const userCollection = dbConnect(servicesObj.usersCollection);
	const user = await userCollection.findOne({ email });
	console.log('user --->', user);
	if(!user) null;
	const isPasswordOK = bcrypt.compare(user.password, password);
	if(!isPasswordOK) null;

	return user;
}