const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res) => {

  try {

    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file selected",
      });
    }

    const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: "ecommerce-devops",
    });

    res.json({
      success: true,
      image: result.secure_url,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Upload Failed",
    });

  }

};

module.exports = {
  uploadImage,
};