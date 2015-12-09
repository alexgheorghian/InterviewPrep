"use strict";
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let port = process.env.PORT || 3000;
let passport = require('passport');
let mongoose = require('mongoose');
require('./models/user');
require('./config/passport');
require('./models/bird');
require('./models/birdSighting');

if(process.env.NODE_ENV === 'test') mongoose.connect('mongodb://localhost/BirdNerd-test')
else mongoose.connect('mongodb://localhost/BirdNerd')


app.set('views', './views');
app.engine('.html', require('ejs').renderFile);
app.use(express.static('./public'));
app.use(express.static('./bower_components'));
app.set('view engine', 'html');
app.set('view options', {
	layout: false
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());

//importing our routes to local variables
let userRoutes = require('./routes/userRoutes');
let birdRoutes = require('./routes/birdRoutes');
let birdSightingRoutes = require('./routes/birdSightingRoutes');

app.get('/', function(req, res) {
	res.render('index');
});

//server.js looks at all '/api/v1/' requests and pulls in the appropriate Routes.js to process them
app.use('/api/v1/users/', userRoutes);
app.use('/api/v1/birds/', birdRoutes);
app.use('/api/v1/birdSightings', birdSightingRoutes);

app.use((err, req, res, next) => {
	if(process.env.NODE_ENV !== 'test') {console.log(err);}
	res.status(500).send(err);
});

module.exports = app.listen(port, () => {
	console.log('Example app listening at http://localhost:' + port);
});
