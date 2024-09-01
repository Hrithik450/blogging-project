import mongoose from "mongoose";
import validator from "validator";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must contain at least 3 letters"],
    maxLength: [32, "Name cannot exceed 32 letters"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide a valid email"],
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    required: true,
    enum: ["Reader", "Author"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "password must contain at least 3 letters"],
    maxLength: [100, "password cannot exceed 32 letters"],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const user = mongoose.model("user", UserSchema);

export default user;
