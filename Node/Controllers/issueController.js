var express = require('express');
var router=express.Router();

var app = express();
const bodyParser=require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.json());


//make sure that the id is a valid id in mongodb
var ObjectId=require('mongoose').Types.ObjectId;

//to use the mongoose issue model that we created
var {Issue}=require('../Models/issue');


router.get('/purchaseId',urlencodedParser,(req,res)=>{
	console.log("Trying to search issue with id: "+req.query.purchaseId);
	Issue.find({purchaseId : req.query.purchaseId} ,(err,docs)=>{
		if(err){console.log('Error in retriving Products : '+JSON.stringify(err,undefined,2));}
		if(!err){
			if(docs==""){
				console.log("issue not found");
				res.send("0");//issue not found
			}
			else{
				console.log("issue found : "+docs);
				res.send(docs);//issue found
			}
		}
	});
});

//To access this get request we type url as=> localhost:3000/products/
//add router to retrieve all product from the Practice database
router.get('/',(req,res)=>{
	Issue.find((err,docs)=>{
		if(!err){ res.send(docs);}
		else{console.log('Error in retriving Products : '+JSON.stringify(err,undefined,2));}
	});
});


//Update using an id
router.put('/:id',urlencodedParser,(req,res)=>{

	if(!ObjectId.isValid(req.params.id))
		return res.status(400).send(`No record with the given id : $(req.params.id)`);
	var item=req.body.issue;
	console.log(item);

	var iss=JSON.parse(req.body.issue);
	
	console.log("Status : "+iss.status);
	
	Issue.findByIdAndUpdate(req.params.id,{$set: iss},{new:true},(err,doc)=>{
		if(!err){res.send(doc);}
		else{console.log('Error in Issue Update : '+JSON.stringify(err,undefined,2));}
	});
});


//=> localhost:3000/products/
//first create object of product model class
//iss will contain entered data
//save kelya war doc madhe new data asel along wth a extra field as _id which is inserted by mongoDB as a primary key
//doc will be a 24hex character string
router.post('/',urlencodedParser,(req,res)=>{
	var iss=new Issue({
		purchaseId:req.body.purchaseId,
		category:req.body.category,
		description: req.body.description,
		status:req.body.status,
		resolution:req.body.resolution
	});
	console.log(iss);
	iss.save((err,doc)=>{
		if(!err){res.send(doc);}
		else{console.log('Error in Issue Save : '+JSON.stringify(err,undefined,2));}
	});
});

//To configure created routes in index.js file
module.exports=router;