import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    unique: [true, "Username already exists!"],
    required: [true, "Username is required!"],
  },
  image: {
    type: String,
  },
});

// check if user already exists in the models, else create one
const User = models.User || model("User", UserSchema);
export default User;
