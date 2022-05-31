const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode')

const authenticate = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token || token === "null") return res.sendStatus(401);

    jwt.verify(token, process.env.MY_SECRET_KEY, (err, user) => {

        if (err) {
            res.sendStatus(401);
        } else {
            let decoded = jwt_decode(token);
            res.locals.userId = decoded.id;
            next();
        };
    });


};

module.exports = authenticate;