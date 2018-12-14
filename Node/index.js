const express=require('express');
const bodyParser=require('body-parser');

var nodemailer = require('nodemailer');

//Local import
//to connect to db, run db.js from here
//this is the syntax fron es6 to import into local variable called mongoose(exported from db.js)
const {mongoose}=require('./db.js');

//import controllers
const productController=require('./Controllers/productController.js');
const issueController=require('./Controllers/issueController.js');
const emailController=require('./Controllers/emailController.js');
const loginController=require('./Controllers/loginController.js');
const orderController=require('./Controllers/orderController.js');

//to call the express function and store it in a variable
var app=express();

//configure middleware in order to send JSON data to NodeJS project
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD')
  next();
});

//start express server
app.listen(3000,()=>console.log('Server started at port : 3000'));

//Add router from productController into this file
app.use('/products',productController);
app.use('/issue',issueController);
app.use('/email',emailController);
app.use('/login',loginController);
app.use('/order',orderController);