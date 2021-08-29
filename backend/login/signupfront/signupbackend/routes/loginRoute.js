const { response } = require('express')
const express = require('express')
const router = express.Router()
const loginTemplateCopy = require('../models/LoginModels')
const bcrypt = require('bcrypt')
const { db } = require('../models/LoginModels')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'dasdfbajkbfkjbjkwbfjsbabfhw !@#ddsadssncmmxbqiu123sbabkwjbda'

router.post('/login', async (request, response) => {

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
        password:securePassword
    })
    signedUpUser.save()
    .then(data => {
        response.json(data)
    })
})

module.exports = router