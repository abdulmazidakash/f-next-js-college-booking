// app/actions/auth/registerUser.js
'use server';
import bcrypt from 'bcrypt';
import dbConnect, { collectionNameObject } from "@/lib/dbConnect";

export const registerUser = async (formData) => { // Accept FormData directly
    const userCollection = await dbConnect(collectionNameObject.usersCollection);

    // Extract data from FormData
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password'); // Plain text password
    const university = formData.get('university');
    const address = formData.get('address');
    const imageFile = formData.get('image'); // This will be a File object or an empty string if no file

    // Validation
    if (!email || !password) {
        return { acknowledged: false, message: "Email and password are required." };
    }

    const user = await userCollection.findOne({ email: email }); // Use extracted email

    if (user) {
        return { acknowledged: false, message: "User already exists with this email." };
    }

    let imageUrl = "";
    if (imageFile instanceof File && imageFile.size > 0) { // Check if it's a valid File object
        try {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const base64Image = buffer.toString("base64");

            const imgbbApiKey = process.env.IMGBB_API_KEY;
            if (!imgbbApiKey) {
                throw new Error("IMGBB_API_KEY is not defined in environment variables.");
            }
            const imgbbUploadUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

            const imgbbFormData = new FormData(); // Create new FormData for ImgBB API
            imgbbFormData.append("image", base64Image);
            imgbbFormData.append("name", imageFile.name);

            const imgbbResponse = await fetch(imgbbUploadUrl, {
                method: "POST",
                body: imgbbFormData,
            });

            if (!imgbbResponse.ok) {
                const errorText = await imgbbResponse.text();
                console.error("ImgBB upload failed:", errorText);
                throw new Error(`ImgBB upload failed: ${errorText}`);
            }

            const imgbbResult = await imgbbResponse.json();
            if (imgbbResult.data && imgbbResult.data.url) {
                imageUrl = imgbbResult.data.url;
            } else {
                throw new Error("ImgBB did not return a valid image URL.");
            }
        } catch (imgbbError) {
            console.error("Error uploading image to ImgBB:", imgbbError);
            return { acknowledged: false, message: `Image upload failed: ${imgbbError.message}` };
        }
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUserPayload = {
        name,
        email,
        password: hashPassword, // Store hashed password
        university,
        address,
        image: imageUrl, // Store the ImgBB URL
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const result = await userCollection.insertOne(newUserPayload);

    // Return a user object that NextAuth's authorize callback expects
    // This is crucial for the signIn call in the frontend to work correctly
    return {
        acknowledged: true, // Indicate success
        message: "User registered successfully.",
        id: result.insertedId.toString(), // MongoDB _id as string
        email: newUserPayload.email,
        name: newUserPayload.name,
        image: newUserPayload.image,
        // Include any other fields NextAuth needs for the session/token
    };
};
