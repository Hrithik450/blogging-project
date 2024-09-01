import { CatchAsyncError } from "../middlewares/asyncerror.js";
import ErrorHandler from "../middlewares/error.js";
import user from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";

export const Register = CatchAsyncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0)
    return next(new ErrorHandler("User Avatar is required", 400));

  const { avatar } = req.files;
  const AllowedFormats = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

  if (!AllowedFormats.includes(avatar.mimetype)) {
    return next(
      new ErrorHandler("Invalid file type, please provide a valid format", 400)
    );
  }

  const { name, email, password, phone, role } = req.body;

  if (!name || !email || !password || !phone || !role || !avatar)
    return next(new ErrorHandler("Please fill all the above details", 400));

  let User = await user.findOne({ email });
  if (User) return next(new ErrorHandler("User Already Exists", 400));

  const hashedpassword = bcrypt.hashSync(password);

  const CloudResponse = await cloudinary.uploader.upload(avatar.tempFilePath);

  if (!CloudResponse || CloudResponse.error) {
    console.error(
      "Cloudinary error",
      CloudResponse.error || "Unknown cloudinary error"
    );
  }

  User = await user.create({
    name,
    email,
    password: hashedpassword,
    phone,
    role,
    avatar: {
      public_id: CloudResponse.public_id,
      url: CloudResponse.secure_url,
    },
  });

  await User.save();

  const token = jwt.sign(
    {
      id: User._id,
    },
    process.env.JWTSECRET,
    {
      expiresIn: "7d",
    }
  );

  res.cookie("HID", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return res.status(200).json({ messsage: "Successfully created" });
});

export const Login = CatchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please fill all the above details", 400));

  const User = await user.findOne({ email }).select("+password");
  if (!User) return next(new ErrorHandler("User not exist", 400));

  const isPassworMatch = await bcrypt.compare(password, User.password);

  if (!isPassworMatch)
    return next(new ErrorHandler("Invalid credentials", 400));

  const token = jwt.sign(
    {
      id: User._id,
    },
    process.env.JWTSECRET,
    {
      expiresIn: "7d",
    }
  );

  res.cookie("HID", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return res.status(200).json({ message: "Successfully loggedIn" });
});

export const Logout = CatchAsyncError(async (req, res, next) => {
  const token = await req.cookies?.HID;

  if (!token) return next(new ErrorHandler("You are not a User", 400));

  jwt.verify(token, process.env.JWTSECRET, (err) => {
    if (err) return next(new ErrorHandler("Invalid Signature"));

    res.clearCookie("HID");
    req.cookies["HID"] = "";
  });

  return res.status(200).json({ message: "Successfully Logged Out!" });
});

export const GetProfile = CatchAsyncError(async (req, res, next) => {
  if (!req.user) return next(new ErrorHandler("please login!", 400));

  let User = req.user;

  User = await user.findById(User.id);

  if (!User) return next(new ErrorHandler("No User found!", 404));

  return res.status(200).json({ message: "success", User });
});

export const GetAuthors = CatchAsyncError(async (req, res, next) => {
  const Authors = await user.find({ role: "Author" });
  if (!Authors) return next(new ErrorHandler("Currently No Author Exist", 400));

  return res.status(200).json({ message: "success", Authors });
});
