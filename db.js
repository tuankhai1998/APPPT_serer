const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "APPPT"
});


db.connect((err) => {
    !err ? console.log("connected") : console.log("Connection failed")
})

module.exports = db