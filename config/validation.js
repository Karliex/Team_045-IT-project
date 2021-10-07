const fs = require('fs');

module.exports = (req, res, next) => {
    //Save category name and image
    //ensure ree.file or req.body not get undefined
    if (typeof (req.file) === 'undefined' || typeof (req.body) === 'undefined') {
        return res.status(400).json({
            errors: 'problem with sending data'
        })
    }

    let name = req.body.name
    let image = req.file.path

    //If type of the image is not supported
    if (!(req.file.mimetype).includes('jpeg') && !(req.file.mimetype).includes('png') && !(req.file.mimetype).includes('jpg')) {
        fs.unlinkSync(req.file.path)      //remove the file
        return res.status(400).json({
            errors: "file not support"
        })
    }

    // If size of the image exceeds 1 megabyte
    if (req.file.size > 1024 * 1024) {
        fs.unlinkSync(req.file.path)
        return res.status(400).json({
            errors: "File is Too large"
        })
    }

    // If the fields are empty
    if (!name || !image) {
        return res.status(400).json({
            sucess: false,
            message: "all fields are required"
        })
    }

    next()
}