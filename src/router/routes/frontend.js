'user strcit';
module.exports = (app,db) => {
    //Front End entry page
    /**
     * GET /
     * @summary Front End Entry Page (SSTI - Server Side Template Injection)(Reflected XXS - Cross Site Scripting)
     * @description  {{range.constructor("return global.process.mainModule.require('child_process').execSync('tail /etc/passwd')")()}}
 | localhost:5000/?message=<script>alert(0)</script>
     * @tags frontend
     * @param {string} message.query - a message to present to the user
     */
     app.get('/', (req,res) =>{
        console.log(req.session);
  
        const nunjucks = require('nunjucks')
        const message = req.query.message || "Please log in to continue"
        rendered = nunjucks.renderString(message);
        res.render('user.html',
        {message : rendered});


        // res.render('user',{
        //     data: scope,
        //     message: {message:req.query.message}
        // })
        
    });
        //Front End register page
    /**
     * GET /register
     * @summary Front End Entry Page 
     * @description  
     * @tags frontend
     * @param {string} message.query - a message to present to the user
     */
 app.get('/register', (req,res) =>{

    const nunjucks = require('nunjucks')
    const message = req.query.message || "Please log in to continue"
    rendered = nunjucks.renderString(message);
    res.render('user-register.html',
    {message : rendered});


    // res.render('user',{
    //     data: scope,
    //     message: {message:req.query.message}
    // })
    
});
    //Front End route to Register
    /**
     * GET /register
     * @summary 
     * @description 
     * @tags frontend
     * @param {string} message.query - a message to present to the user
     * @param {string} email.query.required - email body parameter
     * @param {string} password.query.required - password body parameter
     * @param {string} name.query.required - name body parameter
     * @param {string} address.query.required - address body parameter
     */
     app.get('/registerform', (req,res) =>{
        
        const userEmail = req.query.email;
        const userName = req.query.name;
        const userRole = 'user'
        const userPassword = req.query.password;
        const userAddress = req.query.address
        //validate email using regular expression
        var emailExpression = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var regex = new RegExp(emailExpression)
        console.log(userEmail)
            console.log(emailExpression.test(userEmail))
            if (!emailExpression.test(userEmail)){
                res.redirect("/register?message=Email coulden't be validated, please try again.")
                return
            }
            const md5 = require('md5')
        const new_user = db.user.create(
            {
                name:userName,
                email:userEmail,
                role:userRole,
                address:userAddress,
                password:md5(userPassword)
            }).then(new_user => {
                res.redirect('/profile?id='+new_user.id);
            }).catch(
                (e) =>
                {
                    console.log(e)
                    res.redirect('/?message=Error registering, please try again')

                }
            )
       
        
    });
    //Front End route to log in
    /**
     * GET /login
     * @summary 
     * @description 
     * @tags frontend
     * @param {string} message.query - a message to present to the user
     * @param {string} email.query.required - email body parameter
     * @param {string} password.query.required - password body parameter
     */
     app.get('/login', (req,res) =>{
        var userEmail = req.query.email;
        var userPassword = req.query.password;
        console.log(req.query.message)
        const user = db.user.findAll({
        where: {
            email: userEmail
        }}).then(user => {
            if(user.length == 0){
                res.redirect('/?message=Password was not found! Please Try again')
                return;
            }

            const md5 = require('md5')
            //compare password with and without hash
            if((user[0].password == userPassword) || (md5(user[0].password) == userPassword)){
                req.session.logged = true
                res.redirect('/profile?id='+user[0].id);
                return;
            }
            res.redirect('/?message=Password was not correct, please try again')
        })
        
    });
    //Front End route to profile
    /**
     * GET /profile
     * @summary 
     * @description 
     * @tags frontend
     * @param {string} message.query - a message to present to the user
     * @param {number} id.query - Id number of the profiel holder

     */
     app.get('/profile', (req,res) =>{

        if(!req.query.id){
            res.redirect("/?message=Could not Access profile please log in or register")
            return;
        }
        const user = db.user.findAll({include: // Notice `include` takes an ARRAY
            'beers',
            where: {
                id: req.query.id
            }}).then(user => {
            if(user.length == 0){
                res.redirect('/?message=User not found, please log in')
                return;
            }
            const beers = db.beer.findAll().then(beers => {

                console.log(user)

            res.render('profile.html',
            {beers : beers, user:user[0]});        })
        
    });
});
};