const {Router} = require('express');
const {verifyToken} = require('../utils/middlewares/validateToken');

function protectedRoutes(app){
    const route = Router();
    app.use('/protected', route);

    route.get('/', verifyToken, (req, res)=>{
        res.json({
            error: null,
            data: {
                msg: 'Acceso a ruta protegida',
                user: req.user,
            },
        });
    });
};

module.exports = {protectedRoutes};