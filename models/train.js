var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var TrainSchema = new Schema({
	date:{type:Date, default:Date.now()}
});

module.exports=mongoose.model('Train',TrainSchema);