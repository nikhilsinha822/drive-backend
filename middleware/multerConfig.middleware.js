const multer = require('multer')
const storage = multer.memoryStorage();
const path = require('path')

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|bmp|tiff|webp|svg|ico/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('File upload only supports image filetypes'));
        }
    }
});

module.exports = upload