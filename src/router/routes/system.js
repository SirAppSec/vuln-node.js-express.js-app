'user strcit';

module.exports = (app,db) => {

    //Get System/ warehouse information
    /**
     * GET /v1/status/{brand}
     * @summary check if brand website is available through curl (rce)
     * @Author command execution - brand="bud | whoami"
     * @tags system
     * @param {string} brand.path.required - the beer brand you want to test
     */
    app.get('/v1/status/:brand', (req,res) =>{
        var execSync = require('child_process').execSync;

        try{
            const test = execSync("curl https://letmegooglethat.com/?q="+ req.params.brand)
            res.send(test)
        }
        catch (e){
            console.log(e)
        }
        
    });
};