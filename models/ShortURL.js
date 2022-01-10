const mongoose = require('mongoose');
const url_schema = {
	url: {
		type:String,
		required: true
	},
	short_code: {
		type:String,
		required: true,
		unique: true
	},
	Date: {
		type:Date,
		default: Date.now
	},
	clicks: {
		type: Number,
		default: 0
	}
}	


module.exports = mongoose.model('ShortURL',url_schema);