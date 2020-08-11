const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const jwt = require('jsonwebtoken');





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


app.post('/login', (req, res) => {
    let data = req.body;
    if (data.token) {
        let sql = 'SELECT id, full_name , avatar, phone, email FROM `user` WHERE id = ? ';
        db.query(sql, [data.id], (err, response) => {
            if (err) throw err
            else if (response.length > 0) {
                res.json({ ...response[0], token: data.token })
            }
            else { res.json([]) }
        })
    } else {
        let sql = 'SELECT id, full_name , avatar, phone, email FROM `user` WHERE email LIKE ? and password LIKE ?'
        db.query(sql, [data.userName, data.passWord], (err, response) => {
            if (err) throw err
            else if (response.length > 0) {
                let token = jwt.sign({ ...response[0], type: 'access' }, KEY, { algorithm: 'HS256', expiresIn: '1h' });
                res.json({ ...response[0], token })
            }
            else { res.json([]) }
        })
    }

})

routes(app)

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
})

app.listen(port)

console.log('RESTful API server started on: ' + port)