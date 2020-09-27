const router = require('express').Router()
// const { register, login } = require('../controller/auth/register')
const { get_profile, patch_profile } = require('../controller/home/profile')
const uploadImage = require('../middleware/multer')

router.get("/", get_profile)
router.patch("/edit_profile", uploadImage, patch_profile)

module.exports = router
