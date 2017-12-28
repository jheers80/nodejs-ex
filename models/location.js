var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var StoreStatus=require('./storeStatus');

var LocationSchema = new Schema({
	LocationID : String,
	State: String,
	City: String,
	Status:{type: Schema.ObjectId, ref:'StoreStatus'},
});

LocationSchema.virtual('url').get(function() {
	return '/train/location/'+this._id;
});

LocationSchema.virtual('updateurl').get(function() {
	return '/train/location/' + this._id + '/update';
});

LocationSchema.virtual('fulllocation').get(function() {
	return this.LocationID+' '+this.City+', '+this.State;
});

function autoStatus(next) {
	this.populate('Status');
	next();
};

LocationSchema.pre('findOne',autoStatus).pre('find',autoStatus);

module.exports=mongoose.model('Location',LocationSchema);