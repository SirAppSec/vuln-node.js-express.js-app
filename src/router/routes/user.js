'user strcit';
const config = require('./../../config')
var jwt = require("jsonwebtoken");
const { user } = require('../../orm');
module.exports = (app,db) => {

    //Get all users
    /**
     * GET /v1/admin/users/ 
     * @summary List all users (Unverified JWT Manipulation)(Authorization Bypass)
     * @tags admin
     * @security BearerAuth
     * @return {array<User>} 200 - success response - application/json
     */
    app.get('/v1/admin/users/', (req,res) =>{
        //console.log("auth",req.headers.authorization)
        if (req.headers.authorization){ 
        const user_object = jwt.verify(req.headers.authorization.split(' ')[1],"SuperSecret")
        db.user.findAll({include: "beers"})
            .then((users) => {
                if (user_object.role =='admin'){
                    //console.log("fetch users")
                res.json(users);
                }       
                else{ 
                res.json({error:"Not Admin, try again"})
            }
                
                return;
            }).catch((e) =>{
                res.json({error:"error fetching users"+e})
            });
        

        }else{
            res.json({error:"missing Token in header"})
            return;
        }
        


    });
    //Get information about other users
    /**
     * GET /v1/user/{user_id}
     * @summary Get information of a specific user
     * @tags user
     * @param {integer} user_id.path.required - user id to get information
     * @return {array<User>} 200 - success response - application/json
     */
     app.get('/v1/user/:id', (req,res) =>{
        db.user.findOne({include: 'beers',where: { id : req.params.id}})
            .then(user => {
                res.json(user);
            });
    });
    /**
     * DELETE /v1/user/{user_id} 
     * @summary Delete a specific user (Broken Function Level Authentication)
     * @tags user
     * @param {integer} user_id.path.required - user id to delete (Broken Function Level)
     * @return {array<User>} 200 - success response - application/json
     */
         app.delete('/v1/user/:id', (req,res) =>{
            db.user.destroy({where: { id : req.params.id}})
                .then(user => {
                    res.json({result: "deleted"});
                })
                .catch(e =>{
                    res.json({error:e})
                });
        });
    /**
     * POST /v1/user/
     * @summary create a new user (Weak Password)(ReDos - Regular Expression Denial of Service)
     * @description   "email": "aaaaaaaaa@aaaaaaaaaaaaaaaaaaaaaaaa.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa{",
     * @tags user
     * @param {User} request.body.required - User
     * @return {object} 200 - user response
     */
    app.post('/v1/user/', (req,res) =>{

        const userEmail = req.body.email;
        const userName = req.body.name;
        const userRole = req.body.role
        const userPassword = req.body.password;
        const userAddress = req.body.address
        //validate email using regular expression
        var emailExpression = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var regex = new RegExp(emailExpression)
            console.log(emailExpression.test(userEmail))
            if (!emailExpression.test(userEmail)){
                res.json({error:"regular expression of email couldn't be validated"})
                return
            }
        const new_user = db.user.create(
            {
                name:userName,
                email:userEmail,
                role:userRole,
                address:userAddress,
                password:userPassword
            }).then(new_user => {
                res.json(new_user);
            })
                

    });
         /**
     * GET /v1/love/{beer_id}
     * @summary make a user love a beer(CSRF - Client Side Request Forgery GET)
     * @tags user
     * @param {integer} beer_id.path.required - Beer Id
     * @param {integer} id.query - User ID
     * @param {boolean} front.query - is it a frontend redirect ?
     * @return {object} 200 - user response
     */
          app.get('/v1/love/:beer_id', (req,res) =>{
            var current_user_id = req.query.id;
            var front = true;
            if (req.query.front){
                front = req.query.front
            }
            if(!req.query.id){ // if not provided take from session
                res.redirect("/?message=No Id")
                return
            }
            
            
            const beer_id = req.params.beer_id;

            db.beer.findOne({
                where:{id:beer_id}
            }).then((beer) => {
                const user = db.user.findOne(
                    {where: {id : current_user_id}},
                    {include: 'beers'}).then(current_user => {
                        if(current_user){
                        current_user.hasBeer(beer).then(result => {
                            if(!result){
                                current_user.addBeer(beer, { through: 'user_beers' })
                            }
                            if(front){
                                let love_beer_message = "You Just Loved this beer!!"
                                res.redirect("/beer?user="+ current_user_id+"&id="+beer_id+"&message="+love_beer_message)
                                return
                            }
                            res.json(current_user);
                        })
                    }
                    else{
                        res.json({error:'user Id was not found'});
                    }
                })
            })
            .catch((e)=>{
                res.json(e)
            })
        });
     /**
     * POST /v1/love/{beer_id}
     * @summary make a user love a beer(CSRF - Client Side Request Forgery POST)
     * @tags user
     * @param {integer} beer_id.path.required - Beer Id
     * @param {integer} id.query - User ID
     * @param {boolean} front.query - is it a frontend redirect ?
     * @return {object} 200 - user response
     */
         app.post('/v1/love/:beer_id', (req,res) =>{
            var current_user_id = 1;
            var front = false;
            if (req.query.front){
                front = req.query.front
            }
            if(!req.query.id){ // if not provided take from session
                //if using jwt take from header:
                if(!req.session.user.id){
                    //if not jwt found
                    if(!req.headers.authorization){
                        res.json({error:"Couldn't find user token"})
                    }
                    current_user_id = jwt.decode(req.headers.authorization.split(' ')[1]).id
                }
                current_user_id = req.session.user.id
            }
            current_user_id = req.query.id
            
            const beer_id = req.params.beer_id;

            db.beer.findOne({
                where:{id:beer_id}
            }).then((beer) => {
                const user = db.user.findOne(
                    {where: {id : current_user_id}},
                    {include: 'beers'}).then(current_user => {
                        if(current_user){
                        current_user.hasBeer(beer).then(result => {
                            if(!result){
                                current_user.addBeer(beer, { through: 'user_beers' })
                            }
                            if(front){
                                let love_beer_message = "You Loved this beer!!"
                                res.redirect("/beer?user="+ current_user_id+"&id="+beer_id+"&message="+love_beer_message)
                            }
                            res.json(current_user);
                        })
                    }
                    else{
                        res.json({error:'user Id was not found'});
                    }
                })
            })
            .catch((e)=>{
                res.json(e)
            })
        });

   /**
     * LoginUserDTO for login
     * @typedef {object} LoginUserDTO
     * @property {string} email.required - email
     * @property {string} password.required - password
     */
    /**
     * POST /v1/user/token
     * @summary login endpoint to get jwt token - (Insecure JWT Implementation)
     * @tags user
     * @param {LoginUserDTO} request.body.required - user login credentials - application/json       
     * @return {string} 200 - success
     * @return {string} 404 - user not found
     * @return {string} 401 - wrong password
    */
     app.post('/v1/user/token', (req,res) =>{

        const userEmail = req.body.email;
        const userPassword = req.body.password;
        const user = db.user.findAll({
            where: {
              email: userEmail
            }}).then(user => {
                if(user.length == 0){
                    res.status(404).send({error:'User was not found'})
                return;
                }

                const md5 = require('md5')
                //compare password with and without hash
                if((user[0].password == userPassword) || (md5(user[0].password) == userPassword)){
                    //Add jwt token
                    //logge in logichere
                    const jwtTokenSecret = "SuperSecret"
                    const payload = { "id": user[0].id,"role":user[0].role }
                    var token = jwt.sign(payload, jwtTokenSecret, {
                        expiresIn: 86400, // 24 hours
                      });
                    res.status(200).json({
                        jwt:token,
                        user:user,
                        
                    });
                    return;
                }
                res.status(401).json({error:'Password was not correct'})
            })
                

    });
    /**
     * LoginUserDTO for login
     * @typedef {object} LoginUserDTO
     * @property {string} email.required - email
     * @property {string} password.required - password
     */
    /**
     * POST /v1/user/login
     * @summary login page - (Session fixation)(user enumeration)(insecure password/no hashing)
     * @tags user
     * @param {LoginUserDTO} request.body.required - user login credentials - application/json       
     * @return {string} 200 - success
     * @return {string} 404 - user not found
     * @return {string} 401 - wrong password
    */
     app.post('/v1/user/login', (req,res) =>{

       
        const userEmail = req.body.email;
        const userPassword = req.body.password;
        const user = db.user.findAll({
            where: {
              email: userEmail
            }}).then(user => {
                if(user.length == 0){
                    res.status(404).send({error:'User was not found'})
                return;
                }

                const md5 = require('md5')
                //compare password with and without hash
                if((user[0].password == userPassword) || (md5(user[0].password) == userPassword)){
                    //Add jwt token
                    //logge in logichere
                    res.status(200).json(user);
                    return;
                }
                res.status(401).json({error:'Password was not correct'})
            })
                

    });

    /**
     * PUT /v1/user/{user_id}
     * @summary update user - (horizontal privesc)(mass assignment/BOLA)
     * @tags user
     * @param {User} request.body.required - update credentials - application/json       
     * @param {integer} user_id.path.required
     * @return {string} 200 - success
     * @return {string} 404 - user not found
     * @return {string} 401 - wrong password
    */
     app.put('/v1/user/:id', (req,res) =>{

        const userId = req.params.id;
        const userPassword = req.password;
        const userEmail = req.body.email
        const userProfilePic = req.body.profile_pic
        const userAddress = req.body.address
        const user = db.user.update(req.body, {
            where: {
                id : userId
            }},
            )
        .then((user)=>{
            res.send(user)
        })

                
            
                

    });


    /**
     * PUT /v1/admin/promote/{user_id}
     * @summary promote to admin - (vertical privesc)
     * @tags admin
     * @param {integer} user_id.path.required
     * @return {string} 200 - success
     * @return {string} 404 - user not found
     * @return {string} 401 - wrong password
    */
     app.put('/v1/admin/promote/:id', (req,res) =>{

        const userId = req.params.id;
        const user = db.user.update({role:'admin'}, {
            where: {
                id : userId
            }}
            )
        .then((user)=>{
            res.send(user)
        })

                
            
                

    });

    /**
    * POST /v1/user/{user_id}/validate-otp
    * @summary Validate One Time Password - (Broken Authorization/2FA)(Auth Credentials in URL)(lack of rate limiting)
    * @tags user
    * @param {integer} user_id.path.required
    * @param {string} seed.query - otp seed
    * @param {string} token.query.required - token to be supplied by the user and validated against the seed
    * @return {string} 200 - success
    * @return {string} 401 - invalid token
   */
    app.post('/v1/user/:id/validate-otp', (req,res) =>{

       const userId = req.params.id;
       const user = db.user.findOne({
           where: {
             id: userId
           }}).then(user => {
               if(user.length == 0){
                   res.status(404).send({error:'User was not found'})
               return;
               }
            
            const otplib = require('otplib')

            const seed = req.query.seed || 'SUPERSECUREOTP'; // user supplied seed or hard coded one
            const userToken = req.query.token;

            const GeneratedToken = otplib.authenticator.generate(seed);

            const isValid = otplib.authenticator.check(userToken, GeneratedToken);
            // or
            //const isValid = authenticator.verify({ userToken, GeneratedToken });
               if(isValid || userToken == req.session.otp){
                   const jwtTokenSecret = "SuperSecret"
                   const payload = { "id": user.id,"role":user.role }
                   var jwttoken = jwt.sign(payload, jwtTokenSecret, {
                       expiresIn: 86400, // 24 hours
                     });
                   res.status(200).json({
                       jwt:jwttoken,
                       user:user,
                       
                   });
                   return;
               }
               if(req.query.seed){
                req.session.otp = GeneratedToken // add generated token to session
                req.session.save(function(err) {
                    // session saved
                  })
                res.status(401).json({error:'OTP was not correct, got:' + GeneratedToken})
                return;
               }
               res.status(401).json({error:'OTP was not correct'})
           })
               

   });

};