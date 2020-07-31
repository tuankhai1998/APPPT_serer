const db = require('../../db')

const data = 0;

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM roomView'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    detail: (req, res) => {
        let sql = "SELECT * from roomView WHERE id = ?"
        db.query(sql, [req.params.roomId], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let id = req.params.roomId;
        let sql = 'UPDATE room SET ? WHERE id = ?'
        db.query(sql, [data.room, id], (err, response) => {
            if (err) throw err
            res.json({ message: 'Update success!' })
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO room SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({ message: 'Insert success!' })
        })
    },
    delete: (req, res) => {
        let id = req.params.roomId
        let sql = 'DELETE FROM room WHERE id = ?'
        db.query(sql, [id], (err, response) => {
            if (err) throw err
            res.json({ message: 'Delete success!' })
        })
    },

    getAround: (req, res) => {
        let longitude = req.body.longitude;
        let latitude = req.body.latitude;
        let sql = `SELECT roomView.*, POW(${longitude}-roomView.longitude,2)+POW(${latitude}-roomView.latitude,2) as kc FROM roomView ORDER BY kc `;
        db.query(sql, [longitude, latitude], (err, response) => {
            if (err) throw err;
            res.json(response)
        })
    }



}

// // SELECT concat('[',GROUP_CONCAT(json_object("price", room_details.price ,"type", room_details.type)),']')  AS detail FROM `room_details` GROUP BY id_room
// SELECT room.* FROM room
// INNER JOIN room_image as ri on ri.id_room = room.id
// INNER JOIN user on user.id = room.user_id
// INNER JOIN gadget as gg on gg.id_room = room.id