const jwt = require('jsonwebtoken');
const {jwt_secret} = require('../../config/index');

function verifyToken(req, res, next){
    const token = req.header('auth-token');
    if (!token) return res.status(400).json({ErrorMsg: 'Acceso denegado'});

    try {
        const verified = jwt.verify(token, jwt_secret);
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({ErrorMsg: 'Token no verificado'});
    };
};

module.exports = {verifyToken};