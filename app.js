//declaration
var express = require('express');
var ejs = require('ejs');
var exSession = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

var adminEmployeeList=require('./controllers/admin/employees');
var adminDashboard=require('./controllers/admin/dashboard');
var adminCustomer=require('./controllers/admin/customers');
var adminProfile=require('./controllers/admin/profile');
var adminHotel=require('./controllers/admin/hotels');
var adminBranch=require('./controllers/admin/branchs');
var adminPlace=require('./controllers/admin/place');

//configuration
app.set('view engine', 'ejs');

//middleware 
 app.use(bodyParser.urlencoded({extended:true}));
 app.use(cookieParser());

 app.use('/css', express.static(__dirname +'/css'));
 app.use('/img', express.static(__dirname +'/img'));
 app.use('/js', express.static(__dirname +'/js'));
 
 app.use('/admin/employees', adminEmployeeList);
 app.use('/admin/dashboard', adminDashboard);
 app.use('/admin/customers', adminCustomer);
 app.use('/admin/profile', adminProfile);
 app.use('/admin/hotels', adminHotel);
 app.use('/admin/branchs', adminBranch);
 app.use('/admin/place', adminPlace);
 
//routes
app.get('/', function(req, res){
	res.send('welcome');
});
app.get('/admin', function(req, res){
	res.redirect('/admin/dashboard');
});

//server startup
app.listen(3000, function(){
	console.log('node server started at 3000!');
});