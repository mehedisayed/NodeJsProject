var express = require('express');
var router = express.Router();
var hotelModel = require.main.require('./models/employee/hotel-model');

router.get('/', function(req, res) {
    hotelModel.getAll(function(results){
        if(results.length >= 0){
            res.render('employee/hotels/hotels', {hotellist: results});
        }else{
            res.redirect('/employee');
        }
    });
    

});
router.get('/edit/:id', function(req, res) {
    hotelModel.getById(req.params.id, function(result){
        hotelModel.getAllBranch(function(results)
        {
            res.render('employee/hotels/edit_hotels', {hotel: result,branchlist:results});
        });
        
    });

});

router.post('/edit/:id', function(req, res) {
    var hotel = {
        hotelid: req.params.id,
        hotelname: req.body.name,
        hoteltype: req.body.hoteltype,
        roomtype:req.body.roomtype,
        hotelimage: req.body.hotelimage,
        branchid:req.body.branchid
    };

    hotelModel.update(hotel, function(status){
        if(status){
            res.redirect('/employee/hotels');
        }else{
            res.redirect('/employee/hotels/edit/'+req.params.id);
        }
    });
});
router.get('/delete/:id', function(req, res) {
    var hotel = {
        id: req.params.id
    };
    hotelModel.delete(hotel, function(status){
        if(status){
            res.redirect('/employee/hotels');
        }else{
            res.send('cannot delete this id');
        }
    });
});

router.get('/new', function(req, res) {
    hotelModel.getAllBranch(function(results)
    {
        res.render('employee/hotels/edit_hotels', {hotel: '',branchlist:results});
    });
});
router.post('/new', function(req, res) {
    var hotel = {
        hotelname: req.body.name,
        hoteltype: req.body.hoteltype,
        roomtype:req.body.roomtype,
        hotelimage: req.body.hotelimage,
        branchid:req.body.branchid
    };

    hotelModel.insert(hotel, function(status){
        if(status){
            res.redirect('/employee/hotels');
        }else{
            res.redirect('/employee/hotels/new');
        }
    });
});

module.exports = router;