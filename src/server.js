'user strict';

const express = require('express'),
    //morgan = require('morgan'),
    config = require('./config'),
    router = require('./router'),
    bodyParser = require('body-parser'),
    db = require('./orm');

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
    
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


// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Customer API",
        description: "Customer API Information",
        contact: {
          name: "Amazing Developer"
        },
        servers: ["http://localhost:5555"],
        explorer: true
      }
    },
    // ['.routes/*.js']
    apis: ["./src/router/routes/*.js"]
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));