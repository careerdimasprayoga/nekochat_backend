const route = require("express").Router()

const auth = require("./routes/register")

route.use("/auth", auth)

module.exports = route