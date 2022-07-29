'user strcit';

module.exports = (app,db) => {

    //Get all users
    /**
     * GET /v1/users/
     * @summary list all users
     * @tags user
     * @return {array<User>} 200 - success response - application/json
     */
    app.get('/v1/users', (req,res) =>{
        db.user.findAll()
            .then(user => {
                res.json(user);
            });
    });
    /**
     * POST /v1/user
     * @summery create a new user
     * @tags user
     * @param {User} request.body.required - User
     * @return {object} 200 - user response
     */
    app.post('/v1/user', (req,res) =>{
        
        console.log(req.body)
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
 * LoginUserDTO for login
 * @typedef {object} LoginUserDTO
 * @property {string} email.required - email
 * @property {string} password.required - password
 */
    /**
     * POST /v1/user/login
     * @summery login page - (Session fixation)(user enumeration)
     * @tags user
     * @param {LoginUserDTO} request.body.required - user login credentials - application/json       
     * @return {string} 200 - success
     * @return {string} 404 - user not found
     * @return {string} 401 - wrong password
    */
     app.post('/v1/user/login', (req,res) =>{
        const passport = require('passport')

        passport.authenticate('local', {
            successReturnToOrRedirect: '/',
            failureRedirect: '/login',
            failureMessage: true,
            keepSessionInfo: true
          })
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
                    res.status(200).json(user);
                }
                res.status(401).json({error:'Password was not correct'})
            })
                

    });
};