'user strcit';
//const beers = require("./../../entities/beer.js").Beer

module.exports = (app,db) => {

    //Get all the beers available for ordering
    /**
     * @swagger
     * /order:
     *  get:
     *    description: Use to list everything the user can order
     *    responses:
     *      '200':
     *        description: A successful response
     */
    app.get('/order', (req,res) =>{
        db.beer.findAll()
            .then(beer => {
                res.json(beer);
            });
    });

    /**
    * @swagger
    * /new-beer:
    *   post:
    *     summary: Create a new beer.
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               name:
    *                 type: string
    *                 description: The beer's name.
    *                 example: Amazing Beer
    *               price:
    *                 type: number
    *                 description: The beer's price.
    *                 example: 12
    *     responses:
    *       200:
    *         description: Created
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 data:
    *                   type: object
    *                   properties:
    *                     id:
    *                       type: integer
    *                       description: The beer ID.
    *                       example: 0
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
                res.json(new_beer.id);
            })
                

    });
};