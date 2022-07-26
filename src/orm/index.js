'use strict'

const Sequelize = require('sequelize');
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
fs
  .readdirSync(path.join(__dirname+"/../entities"))
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname+"/../entities", file));(sequelize,Sequelize.DataTypes)
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Add entities here -old way
//db.beer = require('../entities/beer.js');(sequelize,Sequelize);

module.exports = db;