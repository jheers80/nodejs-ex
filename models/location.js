var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var LocationSchema = new Schema({
	LocationID:String,
	Location:String,
	Status:{type:Schema.ObjectID, ref:'StoreStatus'};
});


LocationSchema.virtual('location').get(function() {
	return this.Location;
});

LocationSchema.virtual('LocID').get(function() {
	return this.LocationID;
});

LocationSchema.virtual('url').get(function() {
	return '/locations/'+this._id;
});

modules.exports=mongoose.model('Location',LocationsSchema);