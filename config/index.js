require('dotenv').config();

const config = {
    port: process.env.PORT,
    user: process.env.DB_USER,
    passwd: process.env.DB_PASSWD,
    db_host: process.env.DB_HOST,
    db_name: process.env.DB_NAME,
    jwt_secret: process.env.JWT_SECRET,
};

module.exports = config;