const  {createResponse}   =   require('../utils/responseGenerate');
const Debris   		  =   require('../models/Debris');


module.exports.createDebris = async (req, res, next) => {
	try{
		const body = req.body;
		const debris = new Debris(body);
		await debris.save();
		return res.status(201).json(createResponse(Debris, 'Data stored successfully!', false));
	} catch(err) {
		next(err);
	}
};

module.exports.deleteDebris = async (req, res, next) => {
	try{
		const { id } = req.params;
		const Debris = await Debris.deleteOne({_id: id});
		if(Debris.deletedCount) {
			return res.status(200).json(createResponse(null, 'Data deleted successfully!', false));
		}
		return res.status(404).json(createResponse(null, 'No  data found with this Id!', true));
	} catch(err) {
		next(err);
	}
};

module.exports.getDebrisById = async (req, res, next) => {
	try{
		const { id } = req.params;
		const debris = await Debris.findOne({_id: id});
		if(!debris) throw new Error('Nothing found with this id!');
		return res.json(createResponse(debris));
	} catch(err){
		next(err);
	}
};

module.exports.getDebris = async (req, res, next) => {
	try{
		const query = req.query;
		const debris = await Debris.find(query);
		return res.json(createResponse(debris));
	} catch(err){
		next(err);
	}
};


