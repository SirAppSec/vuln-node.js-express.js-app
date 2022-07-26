'user strict';

const express = require('express'),
    //morgan = require('morgan'),
    config = require('./config'),
    router = require('./router'),
    bodyParser = require('body-parser'),
    db = require('./orm');
    
const app = express()
const PORT = config.PORT;
console.log(config)
//OPTIONAL: Security headers?????
// app.use((req, res, next) => {
//     res.header('Content-Type', 'application/json');
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

//app.use(mrogan('combined'));
app.use(bodyParser.json());
router(app, db);

console.log(db)

//OPTIONAL: Activate Logging


//drop and resync with { force: true }
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log('Express listening on port:', PORT);
    });
  });