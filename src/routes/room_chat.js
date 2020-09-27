const router = require('express').Router()
const { get_roomchat, post_chat } = require('../controller/home/chat')

router.get("/", get_roomchat)
router.post("/send_chat", post_chat)
// router.patch("/edit_profile", uploadImage, patch_profile)

module.exports = router
