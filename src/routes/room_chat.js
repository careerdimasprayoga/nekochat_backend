const router = require('express').Router()
const { get_roomchat, getInChat, post_chat } = require('../controller/home/chat')

router.get("/:id", get_roomchat)
router.get("/getInChat/:id", getInChat)
router.post("/send_chat", post_chat)
// router.patch("/edit_profile", uploadImage, patch_profile)

module.exports = router
