'user strcit';
const config = require('./../../config')
var jwt = require("jsonwebtoken");
module.exports = (app,db) => {

    //Get all users
    /**
     * GET /v1/users/ (PII exposure/oversharing)
     * @summary list all users
     * @tags user
     * @return {array<User>} 200 - success response - application/json
     */
    app.get('/v1/users', (req,res) =>{
        db.user.findAll({include: "beers"})
            .then(user => {
                res.json(user);
            });
    });
        //Get information about other users
    /**
     * GET /v1/user/{user_id}
     * @summary get information of a specific user
     * @tags user
     * @param {integer} user_id.path.required - user id to get information (horizontal priv esc)
     * @return {array<User>} 200 - success response - application/json
     */
     app.get('/v1/user/:id', (req,res) =>{
        db.user.findOne({where:id = req.params.id},{include: "beers"})
            .then(user => {
                res.json(user);
            });
    });
    /**
     * POST /v1/user/
     * @summary create a new user (weak password)
     * @tags user
     * @param {User} request.body.required - User
     * @return {object} 200 - user response
     */
    app.post('/v1/user', (req,res) =>{

        const userEmail = req.body.email;
        const userName = req.body.name;
        const userRole = req.body.role
        const userPassword = req.body.password;
        const userAddress = req.body.address
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
     * POST /v1/love/{beer_id}
     * @summary make a user love a beer(csrf)
     * @tags user
     * @param {integer} beer_id.path.required - User
     * @return {object} 200 - user response
     */
         app.post('/v1/love/:beer_id', (req,res) =>{
             con
            const current_user_id = 1;
            const beer_id = req.params.beer_id;

            db.beer.findOne({
                where:{id:beer_id}
            }).then((beer) => {
                const user = db.user.findOne(
                    {where: id = current_user_id},
                    {include: 'beers'}).then(current_user => {
                        console.log(current_user)
                        current_user.addBeer(beer)
                        res.json(current_user);
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
     * @summary login endpoint to get jwt token - (insecure jwt)
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
                console.log(user)
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
                    console.log(payload)
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
        console.log(req.body)
        const user = db.user.update(req.body, {
            where: {
                id : userId
            }},
            )
        .then((user)=>{
            console.log(user)
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
        console.log(req.body)
        const user = db.user.update({role:'admin'}, {
            where: {
                id : userId
            }}
            )
        .then((user)=>{
            console.log(user)
            res.send(user)
        })

                
            
                

    });
};