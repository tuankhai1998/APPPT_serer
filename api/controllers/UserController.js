const db = require('../../db')
const { json } = require('body-parser')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM `user`'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },

    getByName: (req, res) => {
        let data = req.body;
        let sql = 'SELECT * FROM `user` WHERE email LIKE ? and password LIKE ?'
        db.query(sql, [data.userName, data.passWord], (err, response) => {
            if (err) throw err
            else if (response.length > 0) { res.json(response[0]) }
            else { res.json([]) }
        })
    },

    createUser: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO user SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({ message: 'Insert success!' })
        })
    },

    update: (req, res) => {
        const { id } = req.params;
        let data = req.body;
        let sql = 'UPDATE user SET ? WHERE id = ?'
        db.query(sql, [data, id], (err, response) => {
            if (err) throw err
            res.json({ message: 'Update success!' })
        })
    },

    profileUpdate: (req, res) => {
        const { id } = req.params;
        let data = req.body;
        let sql = 'INSERT INTO user_profile SET ? WHERE id=?'
        db.query(sql, [data, id], (err, response) => {
            if (err) throw err
            res.json({ message: 'Update success!' })
        })
    },

    getProfile: (req, res) => {
        const { id } = req.params;
        let sql = 'SELECT * FROM user_profile WHERE  user_id = ? ';
        db.query(sql, [id], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    }

}

// user.id , user.email, user.full_name, user.avatar, user.phone