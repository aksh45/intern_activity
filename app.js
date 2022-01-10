const express =  require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
require('dotenv/config');
const shortroute = require('./routes/ShortURL');
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use('/',shortroute);
app.get('*',function(req, res){
	res.status(400).send('Sorry this Page does not excist');
});

mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true,useUnifiedTopology: true },() =>{
});

app.listen(process.env.PORT || 3000);