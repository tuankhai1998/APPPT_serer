const db = require('../../db')
const { json } = require('body-parser')
const fs = require('fs');

module.exports = {
    avatar: (req, res) => {
        const user = { ...req.body };
        console.log(req)
        console.log('file', req.file)
        let sql = 'UPDATE `user` SET `avatar` = ? WHERE `user`.`id` = ?';
        db.query(sql, [req.file.filename, user.userid], (err, response) => {
            if (err) throw err
            res.status(200).json({
                message: 'success!',
            })

        })
    },

    getAvatar: (req, res) => {
        let { image } = req.params;
        let patch = './images/' + `${image}`;
        fs.readFile(patch, (err, imageData) => {
            if (err) {
                console.log(err)
            }
            else {
                res.writeHead(200, { 'content-type': 'image/jpeg' });
                res.end(imageData)
            }
        })
    },

    room: () => {

    }

}

// user.id , user.email, user.full_name, user.avatar, user.phonej