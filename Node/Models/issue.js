const mongoose=require('mongoose');

//Give third parameter as a collection name
//if third parameter is not given(in our case)=>Issue becomes issues (ie plural) and gets stored in db 
var Issue=mongoose.model('Issue',{
	purchaseId:{type: Number},
	category:{type: String},
	description:{type: String},
	status:{type: String},
	resolution:{type: String}
});

//export this model
module.exports={ Issue };