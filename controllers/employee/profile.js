var express = require('express');
var router = express.Router();
var profileModel = require.main.require('./models/employee/profile-model');

router.get('/', function(req, res) {

    profileModel.getById(13,function(result){
        res.render('employee/profile/profile',{user:result});
    });
    

});

router.post('/', function(req, res) {
    var user = {
        uid: req.body.id,
        name: req.body.name,
        phone: req.body.phone,
        email:req.body.email,
        address: req.body.address,
        password:req.body.password
    };

    profileModel.updateUsers(user, function(status){
        if(status){
            res.redirect('/employee/profile');
        }else{
            res.send('/employee/profile');
        }
    });
});


module.exports = router;