const express = require('express');
require('../lib/db').connect();
const cors = require('cors');
const {port} = require('../config/index');
const { authRoutes } = require('../routes/authRoutes');
const { protectedRoutes } = require('../routes/protectedRoutes');
//Creación de aplicación express
const app = express();

//Middlewares de express
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());


//Asignación de rutas
authRoutes(app);
protectedRoutes(app);


//Ruta + puerto de escucha del servidor
app.listen(port || 3000, ()=> {
    console.log(`server listening at http://localhost:${port}`);
});