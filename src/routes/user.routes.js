import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
// We can't directly access files, that's why we will use middlewares in user.routes.js
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

export default router;
