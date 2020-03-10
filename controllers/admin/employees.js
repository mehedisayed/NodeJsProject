var express = require('express');
var router = express.Router();
var employeeModel = require.main.require('./models/admin/employee-model');

router.get('/', function(req, res) {
    employeeModel.getAll(function(results){
        if(results.length >= 0){
            res.render('admin/employees/employees', {userlist: results});
        }else{
            res.redirect('/admin/employees/new');
        }
    });
    

});
router.get('/edit/:id', function(req, res) {
     employeeModel.getById(req.params.id, function(result){
         employeeModel.getAllUserType(function(usertype)
         {
            res.render('admin/employees/edit_employees', {user: result,usertypelist:usertype});
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
    employeeModel.updateUsers(user, function(status){
        if(status){
        res.redirect('/admin/employees');    
        }else{
            res.redirect('/admin/employees/edit/'+req.params.id);
        }
    });
});
router.get('/delete/:id', function(req, res) {
    var user = {
        id: req.params.id
    };
    employeeModel.delete(user, function(status){
        if(status){
            res.redirect('/admin/employees');
        }else{
            res.send('cannot delete this id');
        }
    });
});

router.get('/new', function(req, res) {
        employeeModel.getAllUserType(function(results)
        {
           res.render('admin/employees/edit_employees', {user:'',usertypelist:results});
        });
});
router.post('/new', function(req, res) {
    var user = {
        name: req.body.name,
        phone: req.body.phone,
        email:req.body.email,
        address: req.body.address,
        usertypeid:req.body.usertypeid,
        username:req.body.username,
        password:req.body.password
    };

    employeeModel.insert(user, function(status){
        if(status){
            res.redirect('/admin/employees');
        }else{
            res.send('/admin/employees/new');
        }
    });
});

module.exports = router;