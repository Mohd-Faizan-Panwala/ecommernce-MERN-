const multer = require("multer");
const path = require("path");

// storage location
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

// file filter (images only)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Only image files allowed!", false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
