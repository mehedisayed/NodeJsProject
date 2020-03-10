var express = require('express');
var router = express.Router();
var hotelModel = require.main.require('./models/admin/hotel-model');

router.get('/', function(req, res) {
    hotelModel.getAll(function(results){
        if(results.length >= 0){
            res.render('admin/hotels/hotels', {hotellist: results});
        }else{
            res.redirect('/admin');
        }
    });
    

});
router.get('/edit/:id', function(req, res) {
    hotelModel.getById(req.params.id, function(result){
        hotelModel.getAllBranch(function(results)
        {
            res.render('admin/hotels/edit_hotels', {hotel: result,branchlist:results});
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
            res.redirect('/admin/hotels');
        }else{
            res.redirect('/admin/hotels/edit/'+req.params.id);
        }
    });
});
router.get('/delete/:id', function(req, res) {
    var hotel = {
        id: req.params.id
    };
    hotelModel.delete(hotel, function(status){
        if(status){
            res.redirect('/admin/hotels');
        }else{
            res.send('cannot delete this id');
        }
    });
});

router.get('/new', function(req, res) {
    hotelModel.getAllBranch(function(results)
    {
        res.render('admin/hotels/edit_hotels', {hotel: '',branchlist:results});
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
            res.redirect('/admin/hotels');
        }else{
            res.redirect('/admin/hotels/new');
        }
    });
});

module.exports = router;