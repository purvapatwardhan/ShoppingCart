var express = require('express');
var app = express();
const bodyParser=require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.json());

var nodemailer = require('nodemailer');
var router = express.Router();

router.post('/contactUs', urlencodedParser, function(req, res, next) {
  var mailOpts, smtpConfig;
  smtpConfig=nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure:false,
	tls: {rejectUnauthorized: false},
	auth:{
		 user: 'trainingrt4synergistic@gmail.com',
		 pass: 'Synergy@2018'
	}	
  });
  
  mailOpts={
	from: 'trainingrt4synergistic@gmail.com',
	to: 'purvapatwardhan@gmail.com',
	subject: 'User Query',
	text: 'We will try to contact you with in 24hrs! Your query/complain was: '+req.body.message	
  };
  
  smtpConfig.sendMail(mailOpts,function(error,response){
  if(error){
	  console.log(error);
	  res.end("Email send failed");
  }
  else{
	  res.end("Email send sucessfully");	  
  }
  });
});


router.post('/checkOut', urlencodedParser,function(req, res, next) {
  console.log("email : "+req.body.email);
  
  var mailOpts, smtpConfig;
  smtpConfig=nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure:false,
  tls: {rejectUnauthorized: false},
  auth:{
     user: 'trainingrt4synergistic@gmail.com',
     pass: 'Synergy@2018'
  } 
  });
  mailOpts={
  from: 'trainingrt4synergistic@gmail.com',
  to: 'purvapatwardhan@gmail.com',
  subject: 'Bill is Ready',
  text: req.body.message
  };
  
  smtpConfig.sendMail(mailOpts,function(error,response){
  if(error){
    console.log(error);
    res.end("Email send failed");
  }
  else{
    res.end("Email send sucessfully");    
  }
  });
});

module.exports=router;