const {Router} = require('express');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {jwt_secret} = require('../config/index');
const {validationHandler} = require('../utils/middlewares/validationHandler');
const {schemaSignUp, schemaSignIn} = require('../utils/schemas/userSchema');

function authRoutes(app) {
    const route = Router();
    app.use('/auth', route);

    //Ruta de registro
    route.post('/register', validationHandler(schemaSignUp), async(req, res)=> {
        const {name, email, password} = req.body;

        //Verificar si existe el correo
        const emailExist = await User.findOne({email});
        if(emailExist) {
            //Si existe retorna error
            return res.status(400).json({
                msg: 'El correo ya esta registrado'
            });
        };

        //Se realiza el hash a la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        try {
            const newUser = await user.save();
            res.json({
                error: null,
                data: newUser
            })
        } catch (error) {
            res.status(400). json({error})
        };
    });

    //Ruta de inicio de sesión
    route.post('/login', validationHandler(schemaSignIn), async(req, res) => {
        const {email, password} = req.body;

        //Validar si existe el correo
        const user = await User.findOne({email});
        if (!user) {
            //Si no existe retorna error
            return res.status(400).json({
                msg: 'El correo no ha sido registrado',
            });
        };

        //Comparar hash de contraseña
        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
            return res.status(400).json({
                msg: 'La contraseña es invalida',
            });
        };

        //Generar token
        const token = jwt.sign({
            name: user.email,
            id: user._id,
        }, jwt_secret);

        res.header('auth-token', token).json({
            error: null,
            msg: 'Bienvenido',
            token,
        });

    });
};

module.exports = {authRoutes};