const db = require('../../db');
const { response } = require('express');

const data = 0;

module.exports = {
    get: (req, res) => {
        console.log(req.token)
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
        let id = req.params.roomID;
        let sql = 'UPDATE roomView SET ? WHERE roomView.id=?'
        db.query(sql, [data.room, id], (err, response) => {
            if (err) throw err
            res.json({ message: 'Update success!' })
        })
    },

    store: (req, res) => {
        let data = { ...req.body }
        let fullData = JSON.parse(data.data);
        let detail = JSON.stringify(fullData.detail)
        let gadget = [...fullData.gadget]
        fullData.gadget = JSON.stringify(gadget)
        delete fullData['detail']
        const listImage = req.files;
        const url = [];
        listImage.forEach(imageName => {
            url.push(imageName.filename)
        });
        fullData.url = JSON.stringify(url);
        let sql = `INSERT INTO room set ?; `
        db.query(sql, [fullData], (err, response) => {
            if (err) throw err
            let roomDetail = {
                detail,
                id_room: response.insertId
            }
            let sql2 = `INSERT INTO room_details set ?`
            db.query(sql2, [roomDetail], (err, response) => {
                if (err) throw err
                res.json(fullData.user_id)
            })
        })
    },

    delete: (req, res) => {
        let roomID = req.params.roomID;
        let sql = 'DELETE FROM room WHERE id = ?'
        db.query(sql, [roomID], (err, response) => {
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
    },

    getRent: (req, res) => {
        let userID = req.params.userID;
        let sql = `SELECT roomView.* from roomView where roomView.user_id = ?  ORDER BY create_date`;
        db.query(sql, [userID], (err, response) => {
            if (err) throw err;
            res.json(response)
        })
    }



}


//   SET @last_id_in_table1 = LAST_INSERT_ID(); a
