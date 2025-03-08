import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false }, // Password should not be selected by default
    image: { type: String }, // Profile picture (for Google login users)
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
