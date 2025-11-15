const multer = require("multer");

const storage = multer.memoryStorage(); // store files in memory or use diskStorage
const upload = multer({ storage });

module.exports = upload;
