import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
{
    email: {
        type: String,
    },
    name: {
        type: String,
    },
    password: {
        type: String
    }
},
{ collection: "users" }
);

export const users =
    mongoose.models.users || mongoose.model("users", userSchema);