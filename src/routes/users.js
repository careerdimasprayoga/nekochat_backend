const router = require("express").Router()
const { search_users, get_userId, add_friend_request, addFriendChat, confirm_friend_request_1, confirm_friend_request_2, get_request_friend } = require('../controller/home/add_friend')
// const { login } = require('../middleware/auth')

router.get("/search/:id", search_users);
router.get("/id", get_userId);
router.post("/add_friend_request", add_friend_request);
router.get("/friend_request", get_request_friend);
router.patch("/confirm_request", confirm_friend_request_1);
router.post("/confirm_request", confirm_friend_request_2);
router.post("/addFriendChat", addFriendChat);

module.exports = router