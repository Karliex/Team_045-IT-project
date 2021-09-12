const bcrypt = require("bcrypt");

/**
 * encrypt the password of a account and store information in hash format
 */
const encryptPsswd = (password) => {
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt, (err,hash) => {
            if(err) throw err;
            return hash;
            })
        })
    }

module.exports = {encryptPsswd};
