const { response } = require('express')
const express = require('express')
const router = express.Router()
const loginTemplateCopy = require('../models/LoginModels')
const bcrypt = require('bcrypt')
const { db } = require('../models/LoginModels')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'dasdfbajkbfkjbjkwbfjsbabfhw !@#ddsadssncmmxbqiu123sbabkwjbda'
const User = require('../models/LoginModels')

router.post('/login', (request, response) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM mytables WHERE username = ?;",
        username,
        (error, result) => {
            if (error) {
                response.send({ error: error })
            }
            if (result.length > 0) {
                bcrypt.compare(password, result.password, (error, response) => {
                    if (response) {
                        request.session.user = result;
                        console.log(request.session.user);
                        response.send(result);
                    } else {
                        response.send({ message: "Wrong username/password combination!" });
                    }
                });
            } else {
                request.send({ message: "User doesn't exist" });
            }
        }
    )

    
    
    // const { username, password } = request.body
    // const user = User.findOne()
    // if (!username || typeof username !== 'string') {
    //     return response.json({ status: 'error', error:  'Invalid username'})
    // }
    // if (password.length < 5) {
    //     return response.json({ status: 'error', error:  'Password length is too small. Should be at least 6 characters'})
    // }

    // const saltPassword = await bcrypt.genSalt(10)
    // const securePassword = await bcrypt.hash(request.body.password, saltPassword)

    // const logUpUser = new loginTemplateCopy({
    //     username:request.body.username,
    //     password:securePassword
    // })
    // logUpUser.save()
    // .then(data => {
    //     response.json(data)
    // })
})

module.exports = router