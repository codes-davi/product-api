const jwt = require('jsonwebtoken');
const {secret: secret} = require('../routes/AuthController');


const auth = (req, res, next) => {
    const authToken = req.headers['authorization'];

    if(!authToken) return res.sendStatus(401);

    const bearer = authToken.split(' ');
    let token = bearer[1];

    jwt.verify(token, secret, (err, data) => {
        
        if (err) return res.sendStatus(401);
        req.token = token;
        req.loggedUser = {user: data.user};
        next();
    });

};

module.exports = auth;