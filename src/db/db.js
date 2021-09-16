const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const dbUrl = process.env.MONGODB_URI;

if(!dbUrl) {
	console.log('Mongo url not set in env file');
	return new Error('Mongo url not set in env file');
}
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, error => {
	if (error) {
		console.log(`FAILED to connect using mongoose. ${error}`);
	} else {
		console.log(`Connected to DB server. ( ${process.env.NODE_ENV} )`);
	}
});

//Cache

module.exports = mongoose;
