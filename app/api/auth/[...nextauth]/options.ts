import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectToDatabase } from '@/lib/db/db';
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import User from '@/lib/db/models/user.model';
import bcrypt from "bcryptjs";
import clientPromise from '@/lib/db/clientPromise';
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";



export const options: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    secret: process.env.NEXTAUTH_SECRET,    
    providers: [
        CredentialsProvider({
            name: "credentials",
            id: "credentials",
            credentials: {
                username: {
                  label: "username",
                  type: "text"
                },
                password: { label: "Password", type: "password" },
              },
            async authorize(credentials, req) {
                await connectToDatabase();

                try {
                    const user = await User.findOne({ username: credentials?.username });
                    // User exist
                    if(user) {
                        
                        // check Password
                        const userMatched = await bcrypt.compare(credentials?.password, user.password)

                        if(userMatched) {
                            return {
                                username: user.username,
                                id: user._id,
                                email: user.email,
                                photo: user?.photo
                            };
                        }
                        else {
                            throw new Error("Email or password is incorrect");
                        }

                    }
                    else {
                        throw new Error("User not found");
                    }

                } catch (error) {
                    console.log(error)
                }
            }
        }),
        GoogleProvider({
            profile(profile) {
                console.log("Google Profile:", profile);
                return {
                    ...profile,
                    id: profile.sub
                };
            },
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    pages: {
        signIn: "/sign-in"
    },
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
			user && (token.user = user);
			return token;
		},
		async session({ session, token }) {
			session.user = token.user;
			return session;
		},
    }
} 

export default NextAuth(options);