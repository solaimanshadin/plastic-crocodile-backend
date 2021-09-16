const mongoose      =   require('mongoose');
const {Schema}      =   mongoose;
mongoose.Promise    =   global.Promise;

const DebrisSchema = new Schema({
	depth:  String,
	note: String,
	latitude: Number,
	longitude: Number,
	image: String ,
}, {timestamp: true});

module.exports = mongoose.model('Debris', DebrisSchema);