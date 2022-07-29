'user strcit';
//const beers = require("./../../entities/beer.js").Beer

module.exports = (app,db) => {
    //https://github.com/BRIKEV/express-jsdoc-swagger
    //Get all the beers available for ordering
    /**
     * GET /order
     * @summary Use to list all available beer
     * @tags beer
     * @return {array<Beer>} 200 - success response - application/json
     */
    app.get('/v1/order', (req,res) =>{
        db.beer.findAll()
            .then(beer => {
                res.json(beer);
            });
    });
        /**
     * GET /search/{filter}/{query}
     * @summary Search for a specific beer (SQL Injection)
     * @description sqlmap -u 'http://localhost:5000/search/id/2*'
     * @tags beer
     * @param {string} query.path - the query to search for
     * @param {string} filter.path - the column
     * @return {array<Beer>} 200 - success response - application/json
     */
         app.get('/v1/search/:filter/:query', (req,res) =>{
            const filter = req.params.filter
            const query = req.params.query
                const sql = "SELECT * FROM beers WHERE "+filter+" = '"+query+"'";

                const beers = db.sequelize.query(sql, { type: 'RAW' }).then(beers => {
                    console.log(beers)
                    res.status(200).send(beers);

                }).catch(function (err) {
                    res.status(501).send("error, query failed: "+err)
                  })
        
        });
    /**
     * POST /new-beer
     * @summary user to create a new beer in the system
     * @tags beer
     * @param {Beer} request.body.required - Beer
     * @return {object} 200 - respone with the beer created
     */
    app.post('/v1/new-beer', (req,
        res) =>{
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

    /**
     * POST /v1/new-beer-xml
     * @summary user to create a new beer in the system using xml parsing
     * @tags beer
     * @param {Beer} request.body.required - Beer
     * @return {object} 200 - respone with the beer created
     */
    app.post('/v1/new-beer-xml', upload.single('xml'), async function (req, res) {
        if (!req.file) {
            res.sendStatus(500);
            return;
        }
    
        try {
            const xml = req.file.buffer;
            const doc = libxmljs.parseXml(xml, {noent: true});
            
            res.send(doc.text());
        } catch (err) {
            res.send(err.toString());
            res.sendStatus(500);
        }
    });
    
};