'user strcit';
const pug = require('pug')
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
            console.log(user)
            //compare password with and without hash

            res.render('profile.html',
            {user : user});        })
        
    });
};