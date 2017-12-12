var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var StoreStatusSchema = new Schema({
	Status:String,
});

StoreStatusSchema.virtual('id').get(function() {
	return this._id;
});

modules.exports=mongoose.model('Location',StoreStatusSchema);