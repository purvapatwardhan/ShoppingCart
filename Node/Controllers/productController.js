const express=require('express');
var router=express.Router();

//make sure that the id is a valid id in mongodb
var ObjectId=require('mongoose').Types.ObjectId;

//to use the mongoose product model that we created
var {Product}=require('../Models/product');

//To access this get request we type url as=> localhost:3000/products/
//add router to retrieve all product from the Practice database
router.get('/',(req,res)=>{
	Product.find((err,docs)=>{
		if(!err){ res.send(docs);}
		else{console.log('Error in retriving Products : '+JSON.stringify(err,undefined,2));}
	});
});

//=> localhost:3000/products/
//first create object of product model class
//prod will contain entered data
//save kelya war doc madhe new data asel along wth a extra field as _id which is inserted by mongoDB as a primary key
//doc will be a 24hex character string
router.post('/',(req,res)=>{
	var prod=new Product({
		name:req.body.name,
		category:req.body.category,
		price: req.body.price,
		starRating:req.body.starRating
	});
	prod.save((err,doc)=>{
		if(!err){res.send(doc);}
		else{console.log('Error in Product Save : '+JSON.stringify(err,undefined,2));}
	});
});

//To configure created routes in index.js file
module.exports=router;