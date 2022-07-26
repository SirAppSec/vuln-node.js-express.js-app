'user strcit';
//const beers = require("./../../entities/beer.js").Beer

module.exports = (app,db) => {

    //Get all the beers available for ordering
    app.get('/order', (req,res) =>{
        db.beer.findAll()
            .then(beer => {
                res.json(beer);
            });
    });
    app.post('/new-beer', (req,res) =>{
        //console.log(db.beers)
        console.log(req.body)
        const beerName = req.body.name;
        const beerPrice = req.body.price;
        const beerCurrncy = 'USD'
        const beerStock = 'plenty'
        const new_beer = db.beer.create(
            {
                name:beerName,
                currency:beerCurrncy,
                stock:beerStock,
                price:beerPrice,
            }).then(new_beer => {
                res.json(new_beer.id);
            })
                

    });
};