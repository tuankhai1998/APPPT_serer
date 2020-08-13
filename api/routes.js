
const multer = require('multer')



const Storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './images/')
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
    },
})

const upload = multer({
    storage: Storage
})


let { checkToken } = require('../TokenMiddlaware/checkToken.middleware')

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

    app.route('/rooms/:roomID')
        .get(checkToken, productsCtrl.detail);

    app.route('/rents')
        .post(checkToken, upload.array('rooms', 12), productsCtrl.store);

    app.route('/rents/:userID')
        .get(productsCtrl.getRent);

    app.route('/rents/:roomID')
        .put(checkToken, productsCtrl.update)
        .delete(checkToken, productsCtrl.delete);


    // ---------------like------------------

    app.route('/like')
        .post(checkToken, likeCtrl.store);

    app.route('/like/:userID')
        .post(checkToken, likeCtrl.delete)
        .get(likeCtrl.get);

    // ---------------user------------------

    app.route('/user')
        .get(userCtrl.get)
        .post(userCtrl.createUser);

    app.route('/user/:id')
        .post(checkToken, userCtrl.update);


    // app.route('/login')
    //     .post(userCtrl.getByName);

    //--------------upload-----------------

    app.route('/upload/:image')
        .get(uploadCtrl.getImage);

    app.route('/upload/avatar')
        .post(checkToken, upload.single('avatar'), uploadCtrl.avatar);

};