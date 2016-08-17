
var express = require('express');
var router = express.Router();
var request = require('request');
require('express-jsend');

//load image lib
var imageLib = require('../libs/image.js');

router.get('/optimize', function(req, res) {
	
	imageLib.optimizeImages('attachment_userprofile_images.csv', function (err, imageRes) {


		res.jsend(imageRes);

	});
	
});

module.exports = router;