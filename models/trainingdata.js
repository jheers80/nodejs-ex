var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var TrainingInstance=require('./traininginstance');


var TrainingDataSchema = new Schema({
	Text:String,
	TrainingInstance:{type:Schema.ObjectId,ref:'TrainingInstance'},
	Children:[{type:Schema.ObjectId,ref:'TrainingData'}],
	Order:{type:Number, default:0},
	Root:{type:Boolean, default:false},
});

TrainingDataSchema.virtual('numChildren').get(function() {
	return this.Children.length;
});

TrainingDataSchema.virtual('url').get(function() {
	return '/train/trainingdata/'+this._id;
});

function autoPopulateChildren(next) {
	this.populate('Children');
	next();
};

TrainingDataSchema.pre('findOne',autoPopulateChildren).pre('find',autoPopulateChildren);

module.exports=mongoose.model('TrainingData',TrainingDataSchema);