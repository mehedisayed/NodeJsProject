var express = require('express');
var router = express.Router();
var customerModel = require.main.require('./models/customer-model');

router.get('/', function(req, res) {
    customerModel.getAll(function(results){
        if(results.length > 0){
            res.render('admin/customers/customers', {userlist: results});
        }else{
            res.redirect('/admin');
        }
    });
    

});
router.get('/edit/:id', function(req, res) {
    customerModel.getById(req.params.id, function(result){
        customerModel.getAllUserType(function(usertype)
         {
            res.render('admin/customers/edit_employees', {user: result,usertypelist:usertype});
         });
    });

});

router.post('/edit/:id', function(req, res) {
    var user = {
        id: req.params.id,
        name: req.body.name,
        phone: req.body.phone,
        email:req.body.email,
        address: req.body.address,
        usertypeid:req.body.usertypeid
    };

    customerModel.update(user, function(status){
        if(status){
            res.redirect('/admin/customers');
        }else{
            res.redirect('/admin/customers/edit/'+req.params.id);
        }
    });
});
router.get('/delete/:id', function(req, res) {
    var user = {
        id: req.params.id
    };
    customerModel.delete(user, function(status){
        if(status){
            res.redirect('/admin/customers');
        }else{
            res.send('cannot delete this id');
        }
    });
});

router.get('/new', function(req, res) {
    customerModel.getAllUserType(function(results)
        {
           res.render('admin/customers/edit_employees', {user:'',usertypelist:results});
        });
});
router.post('/new', function(req, res) {
    var user = {
        name: req.body.name,
        phone: req.body.phone,
        email:req.body.email,
        address: req.body.address,
        usertypeid:req.body.usertypeid
    };

    customerModel.insert(user, function(status){
        if(status){
            res.redirect('/admin/customers');
        }else{
            res.redirect('/admin/customers/new');
        }
    });
});

module.exports = router;