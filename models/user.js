var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var Location=require('./location');

var UserSchema = new Schema({
	email:String,
	firstName:String,
	lastName:String,
	Location:{type: Schema.ObjectId, ref:'Location'},
	passwordHash:String,
	passwordSalt:String,
	verified:{type:Boolean,default:false}
});


UserSchema.virtual('name').get(function() {
	return this.firstName+' '+this.lastName;
});

UserSchema.virtual('url').get(function() {
	return '/train/user/'+this._id;
});

UserSchema.virtual('updateurl').get(function() {
	return '/train/user/'+this._id+'/update';
});

function autoLocation(next) {
	this.populate('Location');
	next();
};

//UserSchema.pre('findOne',autoLocation).pre('find',autoLocation);

module.exports=mongoose.model('User',UserSchema);