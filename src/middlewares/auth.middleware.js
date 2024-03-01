// It will verify whether there is user or not
import "dotenv/config";
import { jwt } from "jsonwebtoken";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

// next is also passed to move it to the next middleware/response
export const verifyJWT = asyncHandler(async (req, res, next) => {
  // taking access of the cookies with ? for safety
  // we will get hold of accessToken
  // custom header also required as the response may from mobile
  // the header we get is the Authorization most commonly
  // via authorization it's send as bearer followed by token Bearer<token>
  // that's why we replace bearer and space with "" and get hold of token
  try {
    const token =
      req.cookie?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized Access");
    }

    // Now, we have to check the information we get in the token
    // and have to destructure the information using jwt
    // Have to verify the token using verify method
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // finding id present in the DB or not
    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    //checking if user present or not
    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    // giving access of user for verification in user.controller.js
    req.user = user;
    next(); // next to make sure that further tasks execute properly
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
