const mongoose=require('mongoose');

var Order=mongoose.model('Order',{
	purchaseId:{type: Number},
	user:{type: String},
	total:{type: Number},
	items:{type: String}
});

//export this model
module.exports={ Order };