import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // We have to also store refreshToken in the DB
    user.refreshToken = refreshToken;

    // Saving in DB but haven't to check the validity
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating refresh and access tokens"
    );
  }
};

// Steps for registering user
// get user details from frontend (here we can get via postman)
// validation - not empty
// check is user already exists: username, email
// check for images, check for avatar
// upload them to cloudinary, avatar
// create user object - create entry in DB
// remove password and refresh token field from response
// check for user creation
// return response

// req, res is passed
const registerUser = asyncHandler(async (req, res) => {
  // Details can be obtained from req.body except the files
  // For files we need to inject middleware in router file
  const { fullName, email, username, password } = req.body;
  // Checking validity of the entries
  // Will throw Error via already created ApiError file in utils package
  // Knaive approach
  // if(username === null){
  //   throw new ApiError(400, "FullName is required")
  // }
  // Expert Approach - using some func on array
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are compulsory");
  }

  // Checking if user already exists or not
  // We have to import user from user.models.js
  // Will use User along with methode findOne
  // Mostly check only one value
  // But we will professionally check via multiple values
  // Knaive approach
  // User.findOne({username})
  // Professionally checking multiple values
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or password already exists");
  }

  // Now checking for files
  // As we have injected multer middleware it will give access via req.files
  // There are many properties we get hold
  // but we will use the first property at 0th index and thus get the path
  // '?' is for checking whether anything received or not
  const avatarLocalPath = req.files?.avatar[0]?.path;
  // also getting hold of cover image
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  // Handling coverImage if not passed
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar image is required");
  }

  // It will take some time to upload, make it await
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  // checking after upload
  if (!avatar) {
    throw new ApiError(400, "Avatar image is required");
  }

  // Now doing entry in the database - we can do it by already imported user
  // We can do by create() method
  const user = await User.create({
    fullName,
    avatar: avatar.url, // we will only store the url in DB
    coverImage: coverImage?.url || "", // we have to check whether present or not
    email,
    password,
    username: username.toLowerCase(),
  });

  // Checking if user created in the DB or not and further removing password and tokens
  // we will use findById and select
  // Inside select the fields which are not required are passed
  // such that passed with a ' - ' sign - little weird syntax
  const createdUser = await User.findById(user._id) // _id is available
    .select("-password -refreshToken");

  // Now checking and giving error from our side if any
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // returning API Response
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // Taking data from body
  const { email, username, password } = req.body;

  // Checking if any of the username or email is passed by the user
  if (!username && !email) {
    throw new ApiError(400, "username or email is required");
  }

  // Checking via both email and username
  const user = await User.findOne({
    $or: [{ username, email }],
  });

  // Checking if user found or not
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Checking password correct or not using self created method in user.model.js
  // isPasswordCorrect is available with the user reegistered in our DB
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid User  Credentials");
  }

  // If password is correct then make access and refresh tokens
  // It will be done multiple times
  // Better approach create seperate methods in same file for both of them
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  // Some fields are not required, we can again query the db or update the user
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // Sending Cookie
  // We have to make some options so that the modifications can be done on server side
  // but visible to both sides
  const options = {
    httpOnly: true,
    secure: true,
  };

  // Now sending cookie using cookie() method
  // can send multiple cookies just by chaining
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User Logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  // Now, due to middleware, here we have access to req.user
  // we will findById and make refresh token undefined using operator $set
  User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    { new: true } // making it true we will not get the previous values
  );

  // clearing cookies
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged out successfully"));
});
export { loginUser, logoutUser, registerUser };
