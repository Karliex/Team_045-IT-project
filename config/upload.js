const multer = require('multer');
const path = require('path');

// set storage => file name and destination
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './client/public/');
    },
    filename: function (req, file, cb) {
        cb(null, 'congar' + '-' + Date.now() + path.extname(file.originalname));
    }
});


// accept any file and will do validation later
const fileFilter = (req, file, cb) => {
    cb(null, true);
};

let upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

module.exports = upload.single('categoryImage');