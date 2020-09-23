const router = require('express').Router()
const { register, login } = require('../controller/auth/register')

router.post("/register", register)
router.post("/login", login)

module.exports = router
