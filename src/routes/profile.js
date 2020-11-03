const router = require('express').Router()
// const { register, login } = require('../controller/auth/register')
const { get_profile, patch_profile, patchCordinates, getCordinates } = require('../controller/home/profile')
const uploadImage = require('../middleware/multer')

router.get("/", get_profile)
router.patch("/edit_profile/:id", uploadImage, patch_profile)
router.patch("/patchCordinates/:id", patchCordinates)
router.get("/getCordinates/:id", getCordinates)

module.exports = router
