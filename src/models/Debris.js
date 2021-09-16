const mongoose      =   require('mongoose');
const {Schema}      =   mongoose;
mongoose.Promise    =   global.Promise;

const DebrisSchema = new Schema({
	depth:  String,
	note: String,
	latitude: Number,
	longitude: Number,
	image: String ,
	
}, 
{
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
}
);

module.exports = mongoose.model('Debris', DebrisSchema);