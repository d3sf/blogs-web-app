import { Document, Schema, model, models } from "mongoose";

interface IUser extends Document{
  name: string, 
  email: string, 
  password?: string,
  image?: string
}


const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false }, // Password should not be selected by default
    image: { type: String }, // Profile picture (for Google login users)
  },
  { timestamps: true }
);

const User = models.User || model<IUser>("User", UserSchema);
export default User;
