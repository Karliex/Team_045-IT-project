const { response } = require('express')
const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/SignUpModels')
const bcrypt = require('bcrypt')

router.post('/signup', async (request, response) => {

    const { username, password } = request.body
    if (!username || typeof username !== 'string') {
        return response.json({ status: 'error', error:  'Invalid username'})
    }
    if (password.length < 5) {
        return response.json({ status: 'error', error:  'Password length is too small. Should be at least 6 characters'})
    }

    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(request.body.password, saltPassword)

    const signedUpUser = new signUpTemplateCopy({
        username:request.body.username,
        email:request.body.email,
        password:securePassword
    })
    signedUpUser.save()
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        if (error.code === 11000) {
            return response.json({ status: 'error', error: 'Username already in use' })
        }
        //response.json(error)
        // response.status(400).json('Error: ' + error);
        throw error
    })
})

module.exports = router