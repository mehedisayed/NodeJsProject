var express = require('express');
var router = express.Router();
var packageModel = require.main.require('./models/employee/package-model');

router.get('/', function(req, res) {
    packageModel.getAll(function(results){
        if(results.length >= 0){
            res.render('employee/packages/packages', {packagelist: results});
        }else{
            res.redirect('/admin');
        }
    });
    

});
router.get('/edit/:id', function(req, res) {
    packageModel.getById(req.params.id, function(result){
        packageModel.getAllHotel(function(results)
        {
            res.render('employee/packages/edit_packages', {package: result,hotellist:results});
        });
        
    });

});

router.post('/edit/:id', function(req, res) {
    var package = {
        packageid: req.params.id,
        packagename: req.body.name,
        hotelid: req.body.hotelid,
        totalcost:req.body.totalcost
    };

    packageModel.update(package, function(status){
        if(status){
            res.redirect('/employee/packages');
        }else{
            res.redirect('/employee/packages/edit/'+req.params.id);
        }
    });
});
router.get('/delete/:id', function(req, res) {
    var package = {
        id: req.params.id
    };
    packageModel.delete(package, function(status){
        if(status){
            res.redirect('/employee/packages');
        }else{
            res.send('cannot delete this id');
        }
    });
});

router.get('/new', function(req, res) {
    packageModel.getAllHotel(function(results)
    {
        res.render('employee/packages/edit_packages', {package: '',hotellist:results});
    });
});
router.post('/new', function(req, res) {
    var package = {
        packagename: req.body.name,
        hotelid: req.body.hotelid,
        totalcost:req.body.totalcost
    };

    packageModel.insert(package, function(status){
        if(status){
            res.redirect('/employee/packages');
        }else{
            res.redirect('/employee/packages/new');
        }
    });
});

module.exports = router;