'user strcit';
const os = require('os')
const multer = require('multer')
const Hoek = require('hoek')
module.exports = (app,db) => {
    //https://github.com/BRIKEV/express-jsdoc-swagger
    //Get all the beers available for ordering

    /**
     * POST /v1/admin/new-beer/
     * @summary use to create a new beer in the system
     * @tags admin
     * @param {Beer} request.body.required - Beer
     * @return {object} 200 - respone with the beer created
     */
    app.post('/v1/admin/new-beer/', (req,
        res) =>{

        const beerName = req.body.name;
        const beerPrice = req.body.price;
        const beerPic = req.body.picture;
        const beerCurrncy = 'USD'
        const beerStock = 'plenty'
        const new_beer = db.beer.create(
            {
                name:beerName,
                currency:beerCurrncy,
                stock:beerStock,
                price:beerPrice,
                picture:beerPic,
            }).then(new_beer => {
                res.json(new_beer);
            })
                

    });
        /**
     * Beer Pic DTO
     * @typedef {object} BeerPicDTO
     * @property {string} file - image file - binary
     * @property {string} description - file description (optional)
     */
    /**
     * POST /v1/admin/upload-pic/
     * @summary Image upload for admins
     * @tags admin
     * @param {BeerPicDTO} request.body.required - image - multipart/form-data       
     * @return {object} 200 - respone with the image created
     */
     const uploadImage = multer({ dest: './uploads/', })
        app.post('/v1/admin/upload-pic/', uploadImage.single('file'), async function (req, res) {
        if (!req.file) {
            res.sendStatus(500);
            return;
        }

        try {
            const image = req.file;
            
            res.json(image);              

            
        } catch (err) {
            res.json({error: err.toString()});
            //res.sendStatus(500);
        }
    });
    /**
     * Beer DTO for xml
     * @typedef {object} BeerDTO
     * @property {string} file - xml file - binary
     */
    /**
     * POST /v1/admin/new-beer-xml/
     * @summary use to create a new beer in the system using xml parsing (XXE - XML External Entity)
     * @tags admin
     * @param {BeerDTO} request.body.required - beer info - multipart/form-data       
     * @return {object} 200 - respone with the beer created
     */
     const libxmljs  = require('libxmljs');
     const storage = multer.memoryStorage()
     const upload = multer({ storage: storage })
        app.post('/v1/admin/new-beer-xml/', upload.single('file'), async function (req, res) {
        if (!req.file) {
            res.sendStatus(500);
            return;
        }
    
        try {
            const xml = req.file.buffer;
            console.log(xml)
            //const doc = libxmljs.parseXml(xml, {noent: true});
            const doc = libxmljs.parseXml(xml, {noent: true});
            //console.log(doc.text());
            const beerName = doc.name;
                const beerPrice = doc.price;
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

            
        } catch (err) {
            res.send(err.toString());
            res.sendStatus(500);
        }
    });
};