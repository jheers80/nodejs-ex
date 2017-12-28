var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var JobroleSchema = new Schema({
	Name:String,
});

JobroleSchema.virtual('url').get(function() {
	return '/train/jobrole/'+this._id;
});

JobroleSchema.virtual('updateurl').get(function() {
	return '/train/jobrole/'+this._id+'/update';
});

module.exports=mongoose.model('Jobrole',JobroleSchema);