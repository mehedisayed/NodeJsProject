//declaration
var express = require('express');
var ejs = require('ejs');
var exSession = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

var login=require('./controllers/login');
//admin
var adminEmployeeList=require('./controllers/admin/employees');
var adminDashboard=require('./controllers/admin/dashboard');
var adminCustomer=require('./controllers/admin/customers');
var adminProfile=require('./controllers/admin/profile');
var adminHotel=require('./controllers/admin/hotels');
var adminBranch=require('./controllers/admin/branchs');
var adminPlace=require('./controllers/admin/place');
var adminPackages=require('./controllers/admin/packages');

 //manager

 var managerEmployeeList=require('./controllers/manager/employees');
 var managerDashboard=require('./controllers/manager/dashboard');
 var managerCustomer=require('./controllers/manager/customers');
 var managerProfile=require('./controllers/manager/profile');
 var managerHotel=require('./controllers/manager/hotels');
 var managerBranch=require('./controllers/manager/branchs');
 var managerPlace=require('./controllers/manager/place');
 var managerPackages=require('./controllers/manager/packages');
 

//employee
var employeeDashboard=require('./controllers/employee/dashboard');
var employeeCustomer=require('./controllers/employee/customers');
var employeeProfile=require('./controllers/employee/profile');
var employeeHotel=require('./controllers/employee/hotels');
var employeeBranch=require('./controllers/employee/branchs');
var employeePlace=require('./controllers/employee/place');
var employeePackages=require('./controllers/employee/packages');


//configuration
app.set('view engine', 'ejs');

//middleware 
 app.use(bodyParser.urlencoded({extended:true}));
 app.use(cookieParser());

 app.use('/css', express.static(__dirname +'/css'));
 app.use('/img', express.static(__dirname +'/img'));
 app.use('/js', express.static(__dirname +'/js'));
 
 app.use('/login', login);
 //admin
 app.use('/admin/employees', adminEmployeeList);
 app.use('/admin/dashboard', adminDashboard);
 app.use('/admin/customers', adminCustomer);
 app.use('/admin/profile', adminProfile);
 app.use('/admin/hotels', adminHotel);
 app.use('/admin/branchs', adminBranch);
 app.use('/admin/place', adminPlace);
 app.use('/admin/packages', adminPackages);

 //employee
 app.use('/employee/dashboard', employeeDashboard);
 app.use('/employee/customers', employeeCustomer);
 app.use('/employee/profile', employeeProfile);
 app.use('/employee/hotels', employeeHotel);
 app.use('/employee/branchs', employeeBranch);
 app.use('/employee/place', employeePlace);
 app.use('/employee/packages', employeePackages);
 

//manager

app.use('/manager/employees', managerEmployeeList);
app.use('/manager/dashboard', managerDashboard);
app.use('/manager/customers', managerCustomer);
app.use('/manager/profile', managerProfile);
app.use('/manager/hotels', managerHotel);
app.use('/manager/branchs', managerBranch);
app.use('/manager/place', managerPlace);
app.use('/manager/packages', managerPackages);

//routes
app.get('/', function(req, res){
	res.send('welcome');
});
app.get('/admin', function(req, res){
	res.redirect('/admin/dashboard');
});
app.get('/employee', function(req, res){
	res.redirect('/employee/dashboard');
});
app.get('/manager', function(req, res){
	res.redirect('/manager/dashboard');
});

//server startup
app.listen(3000, function(){
	console.log('node server started at 3000!');
});