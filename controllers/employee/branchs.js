var express = require('express');
var router = express.Router();
var branchModel = require.main.require('./models/employee/branch-model');

router.get('/', function(req, res) {
    branchModel.getAll(function(results){
        if(results.length >= 0){
            res.render('employee/branchs/branchs', {branchlist: results});
        }else{
            res.redirect('/employee');
        }
    });
    

});
router.get('/edit/:id', function(req, res) {
    branchModel.getById(req.params.id, function(result){
        branchModel.getAllPlace(function(results)
        {
            res.render('employee/branchs/edit_branchs', {branch: result,placelist:results});
        });
        
    });

});

router.post('/edit/:id', function(req, res) {
    var branch = {
        branchid: req.params.id,
        branchname: req.body.name,
        placeid:req.body.placeid,
        image:req.body.image
    };

    branchModel.update(branch, function(status){
        if(status){
            res.redirect('/employee/branchs');
        }else{
            res.redirect('/employee/branchs/edit/'+req.params.id);
        }
    });
});
router.get('/delete/:id', function(req, res) {
    var branch = {
        id: req.params.id
    };
    branchModel.delete(branch, function(status){
        if(status){
            res.redirect('/employee/branchs');
        }else{
            res.send('cannot delete this id');
        }
    });
});

router.get('/new', function(req, res) {
    branchModel.getAllPlace(function(results)
    {
        res.render('employee/branchs/edit_branchs', {branch: '',placelist:results});
    });
});
router.post('/new', function(req, res) {
    var branch = {
        branchname: req.body.name,
        placeid:req.body.placeid,
        image:req.body.image
    };
    branchModel.insert(branch, function(status){
        if(status){
            res.redirect('/employee/branchs');
        }else{
            res.redirect('/employee/branchs/new');
        }
    });
});

module.exports = router;