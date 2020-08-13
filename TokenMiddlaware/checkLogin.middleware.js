const db = require("../db");
const jwt = require("jsonwebtoken");
const { KEY } = require("../const");



module.exports.isAuthorized = (req, res, next) => {
    let data = req.body;
    if (data.token) {
        let sql = 'SELECT id, full_name , avatar, phone, email FROM `user` WHERE id = ? ';
        db.query(sql, [data.id], (err, response) => {
            if (err) throw err
            else if (response.length > 0) {
                let payload = jwt.verify(data.token, KEY);
                if (payload.type !== 'access')
                    throw " invalid JWT token"
                let token = jwt.sign({ ...response[0], type: 'access' }, KEY, { algorithm: 'HS256', expiresIn: '1h' });
                res.json({ ...response[0], token })
            }
            else {
                res.status(401);
                res.send("invalid user")
            }
        })
    } else {
        let sql = 'SELECT id, full_name , avatar, phone, email FROM `user` WHERE email LIKE ? and password LIKE ?'
        db.query(sql, [data.userName, data.passWord], (err, response) => {
            if (err) throw err
            else if (response.length > 0) {
                let token = jwt.sign({ ...response[0], type: 'access' }, KEY, { algorithm: 'HS256', expiresIn: '1h' });
                res.json({ ...response[0], token })
            }
            else {
                res.json([])
            }
        })
    }
}