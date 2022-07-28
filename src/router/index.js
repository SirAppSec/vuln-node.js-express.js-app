'user strict';

const routes = [
    require('./routes/order'),
    require('./routes/user')
];


// access app and db to each route

module.exports = function router(app,db){
    return routes.forEach((route) => {
       route(app,db) 
    });
};