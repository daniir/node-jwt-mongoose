const mongoose = require('mongoose');
const {user, passwd, db_host, db_name} = require('../config/index');

const db_user = encodeURIComponent(user);
const db_passwd = encodeURIComponent(passwd);

const URI = `mongodb+srv://${db_user}:${db_passwd}@${db_host}/${db_name}?retryWrites=true&w=majority`;
const options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
};

//Conexción con Mongo
exports.connect = () => {
    mongoose.connect(URI, options)
    .then(() => console.log("Conectado con MongoDB"))
    .catch(e => console.error(`DB_Error: ${e}`));
};