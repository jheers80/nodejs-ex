var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var StoreStatusSchema = new Schema({
	Status:String,
});

StoreStatusSchema.virtual('id').get(function() {
	return this._id;
});

StoreStatusSchema.virtual('url').get(function() {
	return '/train/storeStatus/'+this._id;
});

module.exports=mongoose.model('StoreStatus',StoreStatusSchema);