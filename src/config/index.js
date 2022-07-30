

const path = require('path');
require('dotenv').config({path:path.join(__dirname+'./../../.env')});
//console.log(process.env.DATABASE_DIALECT || 'Sample from .env does not work, check .env path')

let db_path = path.join(__dirname+ "/../../db/", 'db.sqlite')
//console.log("Database path:",db_path)

const config = {
    PORT: process.env.APP_PORT || 5000,
    jwtSecret: process.env.JWT_SECRET | "superSecretPassword",

    //env variables
    DATABASE_USERNAME: process.env.DATABASE_USERNAME || null,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || null,
    DATABASE: process.env.DATABASE || 'db.sqlite',
    DATABASE_DIALECT: process.env.DATABASE_DIALECT || 'sqlite',
    DATABASE_STORAGE: process.env.DATABASE_STORAGE || db_path,
}
module.exports = config