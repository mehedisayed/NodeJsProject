var express = require('express');
var router = express.Router();
var placeModel = require.main.require('./models/admin/place-model');

router.get('/', function(req, res) {
    placeModel.getAll(function(results){
        if(results.length >= 0){
            res.render('admin/place/place', {placelist: results});
        }else{
            res.redirect('/admin');
        }
    });
    

});
router.get('/edit/:id', function(req, res) {
    placeModel.getById(req.params.id, function(result){
            res.render('admin/place/edit_place', {place: result});
    });

});

router.post('/edit/:id', function(req, res) {
    var place = {
        placeid: req.params.id,
        placename: req.body.name,
        image:req.body.image
    };

    placeModel.update(place, function(status){
        if(status){
            res.redirect('/admin/place');
        }else{
            res.redirect('/admin/place/edit/'+req.params.id);
        }
    });
});
router.get('/delete/:id', function(req, res) {
    var place = {
        id: req.params.id
    };
    placeModel.delete(place, function(status){
        if(status){
            res.redirect('/admin/place');
        }else{
            res.send('cannot delete this id');
        }
    });
});

router.get('/new', function(req, res) {
        res.render('admin/place/edit_place', {place: ''});
});
router.post('/new', function(req, res) {
    var place = {
        placename: req.body.name,
        image:req.body.image
    
    };
    placeModel.insert(place, function(status){
        if(status){
            res.redirect('/admin/place');
        }else{
            res.redirect('/admin/place/new');
        }
    });
});

module.exports = router;