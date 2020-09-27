const route = require("express").Router()

const auth = require("./routes/register")
const users = require("./routes/users")
const profile = require("./routes/profile")
const chat_room = require("./routes/room_chat")

route.use("/auth", auth)
route.use("/users", users)
route.use("/profile", profile)
route.use("/chat_room", chat_room)

module.exports = route