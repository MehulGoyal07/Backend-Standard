import { asyncHandler } from "../utils/asyncHandler.js";

// req, res is passed
const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "ok",
  });
});

export { registerUser };
