import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { Mongoose, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // Optimized search enabled using index: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // Cloudinary URL
      required: true,
    },
    coverImage: {
      type: String, // cloudinary URL
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// Below we are using a pre-hook
// In brief if user is going to save data then just before that using
// this pre-hook(we can pass the data and destructure it)
// here we will use simple function as a callback and not the arrow function beacuse
// in using arrow functions we cannot get hold of "this context"
// middleware flag next is used
// as this function takes some time that's why kept async
userSchema.pre("save", async function (next) {
  // just we taking hold of the password and encrypting it

  // But problem is that if a person will change something else then password
  // will also change again and again, but we need to save the password
  // on the creation or updation time, that's why we will get a if condition

  if (!this.isModified("password")) return next();

  // using bcrypt hash function
  // passing the password and number of rounds to add complexity to password
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Checking password - creating own method using bcrypt
userSchema.methods.isPasswordCorrect = async function (password) {
  // We will pass password entered by user and this.password for comparison
  // but it takes some time so we have to use await keyword
  // return true/false
  return await bcrypt.compare(password, this.password);
};

// Method for generating access tokens
// async generally not used as it's quite fast
userSchema.methods.generateAccessToken = function () {
  // passing payload, the ACCESS_TOKEN_SECRET and ACCESS_TOKEN_EXPIRY
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// Method for generating refresh tokens
// same as access token but only id is passed as these are generated time to time
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = Mongoose.model("User", userSchema);
