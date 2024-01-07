import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, min: 5, required: true },
    avatar: { type: String, unique: true }
})

const User = models.User || model('User', UserSchema);
export default User;