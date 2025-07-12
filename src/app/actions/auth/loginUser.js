//app/actions/auth/loginUser.js
'use server'
import dbConnect, { collectionNameObject } from '@/lib/dbConnect';
import bcrypt from 'bcrypt';

export const loginUser = async(payload)=>{
	const { email, password } = payload;

	const userCollection = dbConnect(collectionNameObject.usersCollection);
	const user = await userCollection.findOne({ email });
	console.log('user --->', user);
	if(!user) null;
	const isPasswordOK = await bcrypt.compare(user.password, password);
	if(!isPasswordOK) null;

	return user;
}