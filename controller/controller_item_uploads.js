const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

const uploadFiles = upload.array("images", 10);
const uploadImages = (req, res, next) => {
  uploadFiles(req, res, err => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.send("Too many files to upload.");
      }
    } else if (err) {
      return res.send(err);
    }
    next();
  });
};

const resizeImages = async (req, res, next) => {
  if (!req.files) return next();

  req.body.images = [];
  await Promise.all(
    req.files.map(async file => {
      let fileDate = new Date().toISOString().split('T')[0];
      const newFilename = `uploads-${fileDate}-${Date.now()}.jpeg`;
      await sharp(file.buffer)
        .resize(640, 320)
        .toFormat("jpeg")
        .jpeg({ quality: 80 })
        .toFile(`uploads/${newFilename}`);
      req.body.images.push(newFilename);
    })
  );

  next();
};

const post_item_upload_multipleUpload = async (req, res) => {
  console.log(req.body.images)
  if (req.body.images.length <= 0) {
    return res.send(`You must select at least 1 image.`);
  }
  const images = req.body.images
    .map(image => "" + image + "")
    .join("");
  return res.send(`Images were uploaded: in http://localhost:4000/uploads/${images}`);
};

module.exports = {
  uploadImages,
  resizeImages,
  post_item_upload_multipleUpload
};
