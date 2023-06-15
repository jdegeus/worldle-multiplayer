import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from "next-auth/providers/facebook";

import User from '@/models/user';
import { connectToDB } from '@/utils/database';

const authOptions = {
  // pages: {
  //   signIn: '/auth/signin'
  // },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    })
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {

          let image = profile.picture;
          if(account?.provider === 'facebook'){
            image = image?.data?.url;
          }

          await User.create({
            email: profile.email,
            username: profile.name.replaceAll(" ", "").toLowerCase(),
            image,
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions }