
var express = require('express');
var router = express.Router();
var request = require('request');
require('express-jsend');

//load image lib
var imageLib = require('../libs/image.js');

router.get('/optimize/userprofile/:thumbnail', function(req, res) {
	
	var isThumbnail = (req.param('thumbnail') == 'true' ? true : false);

	imageLib.optimizeImages('attachment_userprofile_images.csv', isThumbnail, function (err, imageRes) {

		res.jsend(imageRes);

	});
	
});

router.get('/optimize/audits/:thumbnail', function(req, res) {
	
	var isThumbnail = (req.param('thumbnail') == 'true' ? true : false);

	imageLib.optimizeImages('audit_scorecard_images.csv', isThumbnail, function (err, imageRes) {

		res.jsend(imageRes);

	});
	
});


router.get('/optimize/workorders/:thumbnail', function(req, res) {
	
	var isThumbnail = (req.param('thumbnail') == 'true' ? true : false);

	imageLib.optimizeImages('workorder_request_images.csv', isThumbnail, function (err, imageRes) {

		res.jsend(imageRes);

	});
	
});


module.exports = router;