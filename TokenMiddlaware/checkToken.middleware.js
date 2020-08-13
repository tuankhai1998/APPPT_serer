const { KEY } = require("../const");
const jwt = require("jsonwebtoken")


module.exports.checkToken = (req, res, next) => {
    let authorize_token = req.get('Authorization');
    let jwt_token = "";
    console.log(authorize_token)

    if (authorize_token === undefined) {
        res.status(401);
        res.send("JWT does not exist");
        return;

    } else if (authorize_token.startsWith("Bearer ")) {
        jwt_token = authorize_token.substring(7);

    } else {
        res.status(401);
        res.send("JWT does not begin with Bearer")
        return;
    }
    try {
        let payload = jwt.verify(jwt_token, KEY);
        if (payload.type !== 'access')
            throw "invalid JWT token"
        req.token = jwt_token;
        next();
    } catch (error) {
        console.log(error)
        res.status(401);
        res.send("invalid JWT token")
    }
};
