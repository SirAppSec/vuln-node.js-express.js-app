'use strict'

const Sequelize = require('sequelize');
//import models from './../entities/models'
const path = require('path')
const fs = require('fs');

const env = require("./../config")
const basename = path.basename(__filename);
const sequelize = new Sequelize(env.DATABASE, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
    dialect: env.DATABASE_DIALECT,
    storage: env.DATABASE_STORAGE,
    define: {
      underscored: true
    }
});


const db ={};
db.ROLES = ["user", "admin", "blocked"];
// fs
//   .readdirSync(path.join(__dirname+"/../entities"))
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname+"/../entities", file));(sequelize,Sequelize.DataTypes)
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Add entities here -old way
db.beer = require('../entities/beer.js')(sequelize,Sequelize);
db.user = require('../entities/user.js')(sequelize,Sequelize);

//add associations
db.user.belongsToMany(db.beer, { through: "beer_users" });
db.beer.belongsToMany(db.user, { through: "beer_users" });

module.exports = db;