import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
    throw new Error("Please add your MONGODB_URI to .env.local");
}

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');

  try {
    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'places',
        bufferCommands: false,
    })
    cached.conn = await cached.promise; 
    return cached.conn;
  } catch (error) {
    console.log(error)
  }

}