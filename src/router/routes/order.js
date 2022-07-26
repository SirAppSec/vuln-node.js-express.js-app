'user strcit';

module.exports = (app,db) => {

    //Get all the beers available for ordering
    app.get('/order', (req,res) =>{
        db.beers.findAll({
            beer: 'id DESC'
        })
            .then(beers => {
                res.json(beers);
            });
    });
};