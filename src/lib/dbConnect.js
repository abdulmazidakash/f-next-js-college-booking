// import { MongoClient, ServerApiVersion } from 'mongodb';

// export const collectionNameObject = {
//     collegeCollection: 'college_name', 
//     usersCollection: 'college_user', 
//     admissionCollection: 'admissions', 
//     reviewsCollection: 'reviews', 
// };

// export default function dbConnect(collectionName) {
// 	const uri = process.env.MONGODB_URI;
// 	// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// 	const client = new MongoClient(uri, {
// 	  serverApi: {
// 		version: ServerApiVersion.v1,
// 		strict: true,
// 		deprecationErrors: true,
// 	  }
// 	});
// 	return client.db(process.env.DB_NAME).collection(collectionName);
// }

// lib/dbConnect.js
import { MongoClient, ServerApiVersion } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

export const collectionNameObject = {
    collegeCollection: 'college_name', 
    usersCollection: 'college_user', 
    admissionCollection: 'admissions', 
    reviewsCollection: 'reviews', 
};

export default async function dbConnect(collectionName) {
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.DB_NAME;

    if (!uri) {
        throw new Error('MONGODB_URI is not defined in your environment variables.');
    }
    if (!dbName) {
        throw new Error('DB_NAME is not defined in your environment variables.');
    }

    if (cachedClient && cachedDb) {
        return cachedDb.collection(collectionName);
    }

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        await client.connect();
        cachedClient = client;
        cachedDb = client.db(dbName);
        console.log("MongoDB connected and client cached.");
        return cachedDb.collection(collectionName);
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        if (client) {
            await client.close();
        }
        throw error;
    }
}
