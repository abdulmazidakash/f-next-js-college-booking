// lib/authOptions.js

import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { loginUser } from "@/app/actions/auth/loginUser"; // Assuming this path is correct
import dbConnect, { collectionNameObject } from "./dbConnect"; // Ensure this path is correct relative to this file

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "enter your email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        console.log('CREDENTIALS', credentials);
        const user = await loginUser(credentials); // This function should return a user object with an 'id'
        console.log('authorize user------>', user);

        if (user) {
          // Ensure the user object returned by loginUser has an 'id' property
          // If your MongoDB _id is used, convert it to string: user.id = user._id.toString();
          return user;
        }
        return null;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // This callback is called when a JWT is created (on sign in, or when session is updated)
    async jwt({ token, user, account, profile }) {
      // console.log('JWT Callback:', { token, user, account, profile });
      if (user) {
        token.id = user.id; // Add user.id to the token
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    // This callback is called whenever a session is checked (e.g., on page load, or useSession())
    async session({ session, token }) {
      // console.log('Session Callback:', { session, token });
      if (token.id) {
        session.user.id = token.id; // Add id from token to session.user
      }
      if (token.email) {
        session.user.email = token.email;
      }
      if (token.name) {
        session.user.name = token.name;
      }
      return session;
    },

    // Your existing signIn callback (for database persistence of social logins)
    async signIn({ user, account, profile, email, credentials }) {
      console.log('From signIn callback---->', { user, account, profile, email, credentials });
      if (account) {
        const { providerAccountId, provider } = account;
        const user_email = user?.email;
        const image = user?.image;
        const name = user?.name;

        // Await dbConnect call
        const userCollection = await dbConnect(collectionNameObject.usersCollection);
        const isExistedUser = await userCollection.findOne({ providerAccountId });

        if (!isExistedUser) {
          const payload = { providerAccountId, provider, email: user_email, image, name };
          payload.address = ""; // Initialize address
          payload.university = ""; // Initialize university
          await userCollection.insertOne(payload);
        }
      }
      return true; // Allow sign in
    },
  },
  // debug: process.env.NODE_ENV === "development", // Uncomment for more logs in development
};
