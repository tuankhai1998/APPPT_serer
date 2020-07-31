
const multer = require('multer')


const Storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './images/')
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
    },
})

const upload = multer({ dest: './images' })


'use strict';
module.exports = function (app) {
    let productsCtrl = require('./controllers/ProductsController');
    let likeCtrl = require('./controllers/LikeController');
    let userCtrl = require('./controllers/UserController');
    let uploadCtrl = require('./controllers/uploadControler');


    // ---------------product------------------
    app.route('/rooms')
        .get(productsCtrl.get)
        .post(productsCtrl.getAround);

    app.route('/rooms/:roomId')
        .get(productsCtrl.detail)
        .put(productsCtrl.update)
        .delete(productsCtrl.delete);


    // ---------------like------------------

    app.route('/like')
        .post(likeCtrl.store);

    app.route('/like/:userId')
        .post(likeCtrl.delete)
        .get(likeCtrl.get);

    // ---------------user------------------

    app.route('/user')
        .get(userCtrl.get)
        .post(userCtrl.createUser);

    app.route('/user/:id')
        .post(userCtrl.update);


    app.route('/login')
        .post(userCtrl.getByName);

    //--------------upload-----------------

    app.route('/upload/:image')
        .get(uploadCtrl.getAvatar);

    app.route('/upload/avatar')
        .post(upload.single('avatar'), uploadCtrl.avatar);

    app.route('/upload/room')
        .post(upload.array('rooms', 12), uploadCtrl.room);

};