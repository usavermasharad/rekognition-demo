var express = require('express');
var app = express();

var config = require('./config.js')

var multer  = require('multer');
//upload the  image into given location 
var upload = multer({ dest: 'uploads/' }); 

var AWS = require('aws-sdk');
AWS.config.region = config.region;

var uuid = require('node-uuid');
var fs = require('fs-extra');
var path = require('path');
var imports =require('./creator.js')

app.use(express.static('public'));

var rekognition = new AWS.Rekognition({region: config.region});



app.post('/api/rectest', upload.single("image"), function (req, res, next) {
	var bitmap = fs.readFileSync(req.file.path);

	rekognition.searchFacesByImage({
	 	"CollectionId": config.collectionName,
	 	"FaceMatchThreshold": 70,
	 	"Image": { 
	 		"Bytes": bitmap,
	 	},
	 	"MaxFaces": 1
	}, function(err, data) {
	 	if (err) {
	 		res.send(err);
	 	} else {
			if(data.FaceMatches && data.FaceMatches.length > 0 && data.FaceMatches[0].Face)
			{
				res.send(data.FaceMatches[0].Face);	
			} else {
				res.send("Not recognized");
			}
		}
	});
});

app.listen(4001, function () {
	console.log('Server started with 4001!');
})