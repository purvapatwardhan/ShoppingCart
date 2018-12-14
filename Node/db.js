const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/Practice',(err)=>{
	if(!err) console.log('MongoDB Connection Succefull!!');
	else console.log('Error in DB Connection: '+JSON.stringify(err,undefined,2));
});

//To establish connection outside this connection file
module.exports=mongoose;