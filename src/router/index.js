'user strict';

const routes = [
    require('./routes/order'),
    require('./routes/user'),
    require('./routes/system'),
    require('./routes/admin'),
    require('./routes/frontend')
];


// access app and db to each route

module.exports = function router(app,db){
    return routes.forEach((route) => {
       route(app,db) 
    });
};