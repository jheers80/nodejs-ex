var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var UserSchema = new Schema({
	email:String,
	firstName:String,
	lastName:String,
	Location:String,
	passwordHash:String,
	passwordSalt:String,
	verified:{type:Boolean,default:false}
});


UserSchema.virtual('name').get(function() {
	return this.firstName+' '+this.lastname;
});

UserSchema.virtual('url').get(function() {
	return '/user/'+this._id;
});

modules.exports=mongoose.model('User',UserSchema);