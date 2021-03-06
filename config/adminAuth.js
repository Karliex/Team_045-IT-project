const jwt = require("jsonwebtoken") ;
const Admin = require("../models/adminModel") ;
const asyncHandler = require("express-async-handler") ;

const adminProtect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try {
            token = req.headers.authorization.split(" ")[1];

            //decodes token id
            const decoded = jwt.verify(token, process.env.PASSPORT_KEY);
            
            req.user = await Admin.findById(decoded.body).select("-password");

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

module.exports = adminProtect; 