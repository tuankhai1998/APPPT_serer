
const multer = require('multer')
const jwt = require("jsonwebtoken")
const KEY = 'tU@n KHaI !(9*';


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

// const checkToken = (req, res, next) => {
//     let authorize_token = req.get('Authorization');
//     let jwt_token = "";

//     if (authorize_token === undefined) {
//         res.status(401);
//         res.send("JWT does not exist");
//         return;

//     } else if (authorize_token.startsWith("Bearer ")) {
//         jwt_token = authorize_token.substring(7);
//     } else {
//         res.status(401);
//         res.send("JWT does not begin with Bearer")
//         return;
//     }
//     try {
//         let payload = jwt.verify(jwt_token, KEY);
//         console.log('payload', jwt.verify(jwt_token, KEY))
//         if (payload.type !== 'access')
//             throw " invalid JWT token"
//         req.token = jwt_token;
//         next();
//     } catch (error) {
//         console.log(error)
//         res.status(401);
//         res.send("invalid JWT token")
//     }
// }


'use strict';
module.exports = function (app) {
    let productsCtrl = require('./controllers/ProductsController');
    let likeCtrl = require('./controllers/LikeController');
    let userCtrl = require('./controllers/UserController');
    let uploadCtrl = require('./controllers/uploadControler');


    // ---------------product------------------
    app.route('/rooms')
        .get(checkToken, productsCtrl.get)
        .post(productsCtrl.getAround);

    app.route('/rooms/:roomID')
        .get(checkToken, productsCtrl.detail);

    app.route('/rents')
        .post(checkToken, upload.array('rooms', 12), productsCtrl.store);

    app.route('/rents/:userID')
        .get(checkToken, productsCtrl.getRent);

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