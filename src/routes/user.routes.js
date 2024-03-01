import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
// We can't directly access files, that's why we will use middlewares in user.routes.js
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
// We will use the middleware before the response is send

const router = Router();

// Without using any middleware
// router.route("/register").post(registerUser);

// Using Middleware - using .fields as it can take files object
// Acc to our code we will atmax receive two files avatar and coverImage
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1, //can take more acc to our needs
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// secured routes using auth middleware
// we will inject verifyJWT before executing logout user
// we can inject multiple middlewares if any
router.route("/logout").post(verifyJWT, logoutUser);
export default router;
