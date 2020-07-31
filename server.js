const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const dotenv = require('dotenv');

dotenv.config()

const port = 5000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

// importing route
let routes = require('./api/routes')
routes(app)



// const multer = require('multer')
// const Storage = multer.diskStorage({
//     destination(req, file, callback) {
//         callback(null, './images')
//     },
//     filename(req, file, callback) {
//         callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
//     },
// })

// const upload = multer({ dest: './images' })


// app.post('/upload/avatar', upload.single('avatar'), (req, res) => {
//     console.log('file', req.file)
//     console.log('body', req.body)
//     res.status(200).json({
//         message: 'success!',
//     })
// })

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
})

app.use(cors());

app.listen(port)

console.log('RESTful API server started on: ' + port)