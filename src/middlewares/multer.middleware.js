import multer from "multer";

// Everything available in the official multer documentation
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    // more functionalities and complexity to the filename can be added inorder
    // to avoid any overriding or same file name case
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage,
});
