var express = require('express');
var router = express.Router();
var employeeModel = require.main.require('./models/employee-model');

router.get('/', function(req, res) {

    res.render('admin/dashboard');

});

module.exports = router;