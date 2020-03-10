var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

    res.render('employee/dashboard');

});

module.exports = router;