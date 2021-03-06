require('dotenv').config()
const express = require('express');
const bodyParser = require("body-parser")
const morgan = require("morgan")
const cors = require('cors')
const routerNavigation = require('./src')
const socket = require('socket.io')

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan("dev"))
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*")
  response.header("Access-Control-Allow-Header", "Origin, X-Request-With, Content-Type, Accept, Authorization")
  next()
})
app.use("/", routerNavigation)
app.use(express.static("uploads"))

const http = require('http')
const server = http.createServer(app)
const io = socket(server)


io.on("connection", (socket) => {
  console.log("socket.io connect")

  socket.on("globalMessage", (data) => {
    io.emit("dataChatMessage", data)
  }),
    socket.on("changeRoom", (data) => {
      console.log(data)
      socket.leave(data.oldRoom)
      socket.join(data.newRoom)
    })
})

app.get("*", (request, response) => {
  response.status(404).send("Path not found")
})

server.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Express running at host: ${process.env.IP} and port: ${process.env.PORT}`)
});