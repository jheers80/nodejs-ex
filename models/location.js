var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var LocationSchema = new Schema({
	LocationID:String
	Location:String;
});

modules.exports=mongoose.model('Location',LocationsSchema);