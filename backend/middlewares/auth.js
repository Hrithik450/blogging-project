import user from "../models/user.js";
import { CatchAsyncError } from "./asyncerror.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const verifytoken = CatchAsyncError(async (req, res, next) => {
  const token = await req.cookies?.HID;

  if (!token) return next(new ErrorHandler("You are not authenticated", 400));

  jwt.verify(String(token), process.env.JWTSECRET, (err, User) => {
    if (err) return next(new ErrorHandler("Invaalid Signature"));

    req.user = User;
  });

  next();
});

export const isAuthorized = (roles) => {
  return async (req, res, next) => {
    const User = await user.findById(req.user.id);

    if (!roles.includes(User.role))
      return next(new ErrorHandler("You are not authorized", 400));

    next();
  };
};
