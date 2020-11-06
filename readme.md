<h1 align="center">ExpressJS - Neko Chat RESTfull API</h1>

Backend Realtime Chat menggunakan Socket.io sebagai depedency realtime, dan beberapa depedency tambahan lainnya yang bisa dilihat di file package.json. Aplikasi yang memiliki fitur Realtime Chat, Maps self location, dan profile [More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.13-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name #nama_database, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/)
8. You can see all the end point [here](https://documenter.getpostman.com/view/12330794/TVYQ3utu)

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```
DB_HOST=localhost // Database Host
DB_USER=root // Database User
DB_PASS= /// Database Password
DB_BASE=arkademy_nekochat // Database Name

PORT=3009 // PORT
IP=127.0.0.1 // IP Localhost
```

## End Point

**See Documentation Endpoint Here [here](https://documenter.getpostman.com/view/12330794/TVRrWjtk)**
