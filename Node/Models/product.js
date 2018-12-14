const mongoose=require('mongoose');

//Give third parameter as a collection name
//if third parameter is not given(in our case)=>Product becomes products (ie plural) and gets stored in db 
var Product=mongoose.model('Product',{
	name:{type: String},
	category:{type: String},
	price:{type: Number},
	starRating:{type: String}
});

//export this model
module.exports={ Product };



