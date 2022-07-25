//routes are the pathway were the controller actions will be effected. That is where the corresponding action the user takes will show. This is authentication events route
const express = require('express')
const router = express.Router()

const {login,register} = require('../controllers/auth')

router.post('/register', register)
router.post('/login', login)

module.exports = router