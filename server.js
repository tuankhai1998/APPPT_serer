const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const jwt = require('jsonwebtoken');

const { isAuthorized } = require("./TokenMiddlaware/checkLogin.middleware")



const app = express();

const port = 5000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

// importing route
let routes = require('./api/routes');
const db = require('./db');
const KEY = 'tU@n KHaI !(9*';

app.use(cors());


app.post('/login', isAuthorized)

routes(app)

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
})

app.listen(port)

console.log('RESTful API server started on: ' + port)