import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import fs from "fs"; // Using nodeJS file handling functionality

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Before direct upload we have to link/unlink the files from local storage
// that's why creating seperate method
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // automatic detecting type of file
    });

    // File has been uploaded successfully
    // console.log("File has been uploaded successfully", response.url);

    // Now need to ulink the file from our storage
    fs.unlinkSync(localFilePath)
    return response;
  } catch (error) {
    // remove the locally saved temporary file as the upload oprn got failed
    fs.unlinkSync(localFilePath);
  }
};

export { uploadOnCloudinary };

// We will not directly upload but through link/unlink files
// cloudinary.uploader.upload(
//   "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" },
//   function (error, result) {
//     console.log(result);
//   }
// );
