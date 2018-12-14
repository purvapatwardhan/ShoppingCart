const mongoose=require('mongoose');

//Give third parameter as a collection name
//if third parameter is not given(in our case)=>Login becomes logins (ie plural) and gets stored in db 
var Creds=mongoose.model('Login',{
	user:{type: String},
	password:{type: String}
});

//export this model
module.exports={ Creds };