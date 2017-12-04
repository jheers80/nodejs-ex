var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var UserSchema = new Schema({
	email:String;
	firstName:String;
	lastName:String;
	Location:String;
	passwordHash:String;
	passwordSalt:String
});

modules.exports=mongoose.model('User',UserSchema);