'user strcit';
//const beers = require("./../../entities/beer.js").Beer

module.exports = (app,db) => {

    //Get all the beers available for ordering
    /**
     * GET /order
     * @summary Use to list all available beer
     * @tags beer
     * @return {array<Beer>} 200 - success response - application/json
     */
    app.get('/order', (req,res) =>{
        db.beer.findAll()
            .then(beer => {
                res.json(beer);
            });
    });
    /**
     * POST /new-beer
     * @summary user to create a new beer in the system
     * @tags beer
     * @param {Beer} request.body.required - Beer
     * @return {object} 200 - song response
     */
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
                res.json(new_beer);
            })
                

    });
};