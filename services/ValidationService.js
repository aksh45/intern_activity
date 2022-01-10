const isURL = (str)=>{
	try{
		var url = new URL(str);
	}
	catch(err){
		return false
	}
	var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
	'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
	'((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
	'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
	'(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
	'(\\#[-a-z\\d_]*)?$','i'); // fragment locator
	return pattern.test(str);
}
const isShortCodeValid = (short_code)=>{
	const res = /^[A-Za-z0-9_\.-]+$/.exec(short_code);
	const valid = !!res;
	return valid;	
}
const urlObjectValidation = (data)=>{
	if(!data.url){
		return {message: 'url is required field', status: 400};
	}
	if(!isURL(data.url))
		return {message: 'invalid url',status: 422};
	if(data.short_code && ! isShortCodeValid(data.short_code))
		return {message: 'invalid short_code',status: 422};
	return {message: 'ok'};
}
const getInfoValidation  = (data)=>{
	if(!data.short_url)
		return {message: 'short_url is required field',status: 400}
	
	if(!isURL(data.short_url) || (data.short_url.split('/')).length != 4 || ! isShortCodeValid((data.short_url.split('/')).slice(-1)) || (data.short_url.split('/'))[2] != data.host_name )
		return {message: 'invalid short_url value', status: 422};
	return {message: 'ok'};

}
const shortCodeValidation = (data)=>{
	if(!isShortCodeValid(data.short_code))
		return {message: 'invalid url',status: 422}
	return {message: 'ok'};
}

module.exports.urlObjectValidation =  urlObjectValidation;
module.exports.getInfoValidation =  getInfoValidation;
module.exports.shortCodeValidation = shortCodeValidation;