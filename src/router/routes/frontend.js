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
        rendered = nunjucks.renderString('message: '+req.query.message);
        res.render('user.html',
        {message : rendered});


        // res.render('user',{
        //     data: scope,
        //     message: {message:req.query.message}
        // })
        
    });
    //Front End route to log in
    /**
     * GET /
     * @summary 
     * @description 
     * @tags frontend
     * @param {string} message.query - a message to present to the user
     */
     app.get('/login', (req,res) =>{
        console.log(req.session);

        var email = req.body.email;
        var password = req.body.password;
        console.log(req.query.message)
        res.render('profile',{
            message:req.query.message
        })
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
                req.session.logged = true
                res.render('profile',{user:user});
                return;
            }
            res.status(401).json({error:'Password was not correct'})
        })
        
    });
};