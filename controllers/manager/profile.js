var express = require('express');
var router = express.Router();
var profileModel = require.main.require('./models/manager/profile-model');

router.get('/', function(req, res) {

    profileModel.getById(13,function(result){
        res.render('manager/profile/profile',{user:result});
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
            res.redirect('/manager/profile');
        }else{
            res.send('/manager/profile');
        }
    });
});


module.exports = router;