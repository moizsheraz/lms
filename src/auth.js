import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import crypto from "crypto"; 
import { dbConnect } from "./lib/mongo";
import { Student } from "../backend/model/student-model";
import { Teacher } from "../backend/model/teacher-model";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) return null;

        await dbConnect();

        const { email, password } = credentials;

        // Check for user in both collections
        let user = await Student.findOne({ email });
        const isStudent = !!user;

        if (!user) {
          user = await Teacher.findOne({ email });
        }

        if (user) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            // Generate a unique session token
            const sessionToken = crypto.randomUUID();

            // Invalidate previous session by updating `currentSession`
            if (isStudent) {
              await Student.findByIdAndUpdate(user._id, { currentSession: sessionToken });
            } else {
              await Teacher.findByIdAndUpdate(user._id, { currentSession: sessionToken });
            }

            // Attach session token to the user object
            user.currentSession = sessionToken;

            return { ...user.toObject(), sessionToken };
          }
          throw new Error("email or password is not correct");
        }
        throw new Error("User not found");
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.profilePicture;
        token.sessionToken = user.sessionToken; // Attach session token to JWT
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        await dbConnect();

        // Validate the session token in the database
        let user = await Student.findById(token.id).exec();
        if (!user) {
          user = await Teacher.findById(token.id).exec();
        }

        if (!user || user.currentSession !== token.sessionToken) {
          throw new Error("Session invalid or expired. Please log in again.");
        }

        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.picture = token.picture;
      }
      return session;
    },
  },
});
