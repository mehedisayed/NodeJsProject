var express = require('express');
var router = express.Router();
var loginModel = require.main.require('./models/login-model');

router.get('/', function(req, res) {

    res.render('login');

});
router.post('/', function(req, res) {
    var user = {
        username: req.body.username,
        password:req.body.password
    };
    console.log(user.username);
    console.log(user.password);
    loginModel.getByUsername(user, function(result){
        if(result > 0){
            res.cookie('user', result);
            if(result.usertypeid=="1"){
                res.redirect('/admin');
            }
			
        }else{
            res.send('/login');
        }
    });
});

module.exports = router;