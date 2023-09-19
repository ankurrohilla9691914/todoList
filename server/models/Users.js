import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 20,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 20,
    },
    userName: {
        type: String,
        required: true,
        trim: true,

        unique: true,
        index: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true,
    },
    password: { type: String, required: true },
    phone: { type: String, required: true },
});

const user = mongoose.model("user", userSchema);

export default user;