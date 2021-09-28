const { createResponse } = require('../utils/responseGenerate');
const Debris = require('../models/Debris');

module.exports.createDebris = async (req, res, next) => {
	try {
		const body = req.body;
		const debris = new Debris(body);
		await debris.save();
		return res
			.status(201)
			.json(createResponse(Debris, 'Data stored successfully!', false));
	} catch (err) {
		next(err);
	}
};

module.exports.updateDebris = async (req, res, next) => {
	try {
		const { id } = req.params;
		const debris = await Debris.updateOne(
			{
				_id: id,
			},
			{
				...req.body,
			}
		);

		return res
			.status(204)
			.json(createResponse(debris, 'Data updated successfully!', false));
	} catch (err) {
		next(err);
	}
};

module.exports.deleteDebris = async (req, res, next) => {
	try {
		const { id } = req.params;
		const debris = await Debris.deleteOne({ _id: id });
		if (debris.deletedCount) {
			return res
				.status(200)
				.json(createResponse(null, 'Data deleted successfully!', false));
		}
		return res
			.status(404)
			.json(createResponse(null, 'No  data found with this Id!', true));
	} catch (err) {
		next(err);
	}
};

module.exports.getDebrisById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const debris = await Debris.findOne({ _id: id });
		if (!debris) throw new Error('Nothing found with this id!');
		return res.json(createResponse(debris));
	} catch (err) {
		next(err);
	}
};

module.exports.getDebris = async (req, res, next) => {
	try {
		const query = req.query;

		const page = query.page || 1;
		delete query.page;
		const perPage = query.perPage || 12;
		delete query.perPage;
		const total = await Debris.countDocuments(query);
		const debris = await Debris.find(query)
			.sort({ created_at: -1 })
			.skip(Number(perPage) * (page - 1))
			.limit(Number(perPage));
		return res.json({ data: debris, total });
	} catch (err) {
		next(err);
	}
};

module.exports.detectionStatistics = async (req, res, next) => {
	try {
		const total = await Debris.countDocuments();

		const data = await Debris.aggregate([
			{
				$project: {
					total: 1,
					day: { $dayOfMonth: { date: '$created_at', timezone: 'Asia/Dhaka' } },
					month: { $month: { date: '$created_at', timezone: 'Asia/Dhaka' } },
					year: { $year: { date: '$created_at', timezone: 'Asia/Dhaka' } },
					created_at: 1
				},
			},

			// Group by year, month and day and get the count
			{
				$group: {
					_id: {
						year: '$year',
						month: '$month',
						day: '$day',
					},
					count: { $sum: 1 },
				},
			},
			{ $sort: { '_id.create_at': -1 } },
		]);

		return res.json({ data, total });
	} catch (err) {
		next(err);
	}
};
