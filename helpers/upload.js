const fs = require("fs-extra");
const cloudinary = require("./cloudinary");

/**
 * @param {string} folderName
 * usage: uploadToCloud("profile_photos")
 */
const uploadToCloud = (folderName) => {
  return async (req, res, next) => {
    try {
      const file = req.file;
      console.log(" file -> ", file );

      if (!file) {
        return res.status(400).json({
          message: "No file uploaded"
        });
      }

      const result = await cloudinary.uploader.upload(
        file.path,
        {
          folder: folderName,
          resource_type: "auto"
        }
      );

      // delete temp file (optional)
      await fs.unlink(file.path);

      // attach to request
      req.image = {
        url: result.secure_url,
        public_id: result.public_id,
        folder: folderName
      };

      next();
    } catch (err) {
      console.log(" Cloudinary error → ", err );
      return res.status(500).json({
        error: err.message
      });
    }
  };
};

module.exports = uploadToCloud;