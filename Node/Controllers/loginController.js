const express=require('express');
var router=express.Router();

var app = express();

const bodyParser=require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true })

app.use(bodyParser.json());

//make sure that the id is a valid id in mongodb
var ObjectId=require('mongoose').Types.ObjectId;

//to use the mongoose creds model that we created
var {Creds}=require('../Models/creds');

router.get('/',(req,res)=>{

	Creds.find({user:req.query.user},(err,docs)=>{
		if(err){res.send("Error");}
		if(!err){
			if(docs==""){
				res.send("0");//user not found
			}
			else{
				if(docs[0].password==req.query.password){
					res.send("1");//user found with right creds
				}
				else{
					res.send("2");//user found with wrong creds
				}
			}
		}
	});
		
		/*
	Creds.find((err,docs)=>{
		if(!err){ res.send(docs);}
		else{console.log('Error in retriving Products : '+JSON.stringify(err,undefined,2));}
	});*/
});
	

//=> localhost:3000/login/
//first create object of product model class
//prod will contain entered data
//save kelya war doc madhe new data asel along wth a extra field as _id which is inserted by mongoDB as a primary key
//doc will be a 24hex character string
router.post('/',urlencodedParser,(req,res)=>{
	var cred=new Creds({
		user:req.body.user,
		password:req.body.password
	});
	cred.save((err,doc)=>{
		if(!err){res.send(doc);}
		else{console.log('Error in Credentials Save : '+JSON.stringify(err,undefined,2));}
	});
});

//To configure created routes in index.js file
module.exports=router;