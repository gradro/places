"use server";

import { CreateUserParams } from "@/types";
import { connectToDatabase } from "../db/db";
import User from "../db/models/user.model";
import bcrypt from 'bcryptjs'

// Create user 
export async function createUser({ user }: { user: CreateUserParams; }): Promise<any> {
    try {
        
        await connectToDatabase();

        if(user) {

            // Hash password
            const hashedPw = await bcrypt.hash(user.password, 5)

            const newUser = await User.create({ ...user, password: hashedPw });
            return JSON.parse(JSON.stringify(newUser))

        } else {
            throw new Error("Invalid Data")
        }

    } catch (error: any) {
        throw new Error(error);
    }
}