'user strcit';

module.exports = (app,db) => {

    //Get all users
    /**
     * GET /users/
     * @summary list all users
     * @tags user
     * @return {array<User>} 200 - success response - application/json
     */
    app.get('/users', (req,res) =>{
        db.user.findAll()
            .then(user => {
                res.json(user);
            });
    });
    /**
     * POST /user
     * @summery create a new user
     * @tags user
     * @param {User} request.body.required - User
     * @return {object} 200 - user response
     */
    app.post('/user', (req,res) =>{
        
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
};