'user strcit';

const beers = require("./../../entities/beer.js").Beer;

module.exports = (app,db) => {

    //Get all the beers available for ordering
    app.get('/order', (req,res) =>{
        beers.findAll()
            .then(beers => {
                res.json(beers);
            });
    });
};