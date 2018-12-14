const express=require('express');
var router=express.Router();
var app = express();

const bodyParser=require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true })

app.use(bodyParser.json());


//make sure that the id is a valid id in mongodb
var ObjectId=require('mongoose').Types.ObjectId;

//to use the mongoose order model that we created
var {Order}=require('../Models/order');

//To access this get request we type url as=> localhost:3000/order/
//add router to retrieve all product from the Practice database
router.get('/',(req,res)=>{
	Order.find((err,docs)=>{
		if(!err){ res.send(docs);}
		else{console.log('Error in retriving Orders : '+JSON.stringify(err,undefined,2));}
	});
});

//=> localhost:3000/order/
router.post('/', urlencodedParser,(req,res)=>{
	var order=new Order({
		user:req.body.user,
		purchaseId:req.body.purchaseId,
		total: req.body.total,
		items:req.body.items
	});

	order.save((err,doc)=>{
		if(!err){res.send(doc);}
		else{console.log('Error in Order Save : '+JSON.stringify(err,undefined,2));}
	});
});

router.get('/user',(req,res)=>{
	
	Order.find({user : req.query.userName} ,(err,docs)=>{
		if(err){console.log('Error in retriving Products : '+JSON.stringify(err,undefined,2));}
		if(!err){
			if(docs==""){
				console.log("orders not found");
				res.send("0");//orders not found
			}
			else{
				console.log("orders found : "+docs);
				res.send(docs);//orders found
			}
		}
	});

});


//To configure created routes in index.js file
module.exports=router;