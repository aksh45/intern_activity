const express = require('express');
const nanoid = require('nanoid');
const URL = require('../models/ShortURL');
const router = express.Router();
const {urlObjectValidation} = require('../services/ValidationService');
const {getInfoValidation} = require('../services/ValidationService');
const {shortCodeValidation} = require('../services/ValidationService');

router.post('/makemeshort',async(req,res) =>{
	var validate = urlObjectValidation(req.body);
	if(validate.message != 'ok')
		return res.status(validate.status).json({message: validate.message});
	var new_short = new URL({
		url: req.body.url,
		short_code: req.body.short_code || nanoid.nanoid(9),
	})
	try{
		const res_new_short = await new_short.save();
		return res.json({message:"success",short_url: `http://${req.headers.host}/${res_new_short.short_code}`});
	}
	catch(err){
		if(err && err.code === 11000){
			return res.status(409).json({message: 'Short Code Already exists'});
		}
		return res.status(500).json({message: 'Something Went Wrong'});
	}
})

router.get('/:short_code',async(req,res) =>{
	try{
		var validate = shortCodeValidation({short_code: req.params.short_code});
		if(validate.message != 'ok')
			return res.status(validate.status).json({message: validate.message});
		var url = await URL.findOneAndUpdate({short_code: req.params.short_code},{$inc: {clicks: 1}});
		if(url)
			return res.redirect(url.url)
		return res.status(404).json({message: 'not found'});
	}
	catch(err){
		res.status(500).json({message: 'Something went wrong'});
	}
})

router.post('/getinfo',async(req,res) =>{
	try{
		req.body.host_name = req.headers.host;
		var validate =  getInfoValidation(req.body);
		if(validate.message != 'ok')
			return res.status(validate.status).json({message: validate.message});
		var short_url = req.body.short_url;
		var splitted_url = short_url.split('/');
		var short_code = splitted_url[splitted_url.length - 1];
		var url_object = await URL.findOne({short_code: short_code});
		if(!url_object)
			return res.status(404).json({message: "short url not found"});
		return res.json({url: url_object.url,createt_at: url_object.Date,clicks: url_object.clicks});
	}
	catch(err){
		return res.status(500).json({message: "something went wrong"});
	}
})



module.exports = router;