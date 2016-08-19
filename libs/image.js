var request = require('request');
var fs = require('fs');
var xlsx = require('node-xlsx');
var parse = require('csv-parse');
var async = require('async');


var imageLib = {
	
	optimizeImages: function (listFile, isThumbnail, cb) {
		
		var $self = this;

		//get images
		var images = this.getAllImages(listFile, function (err, res){

			if (err) {
				cb(err, null);	
			} else {
				
				$self.downloadAllImages(res, isThumbnail, function(err, res) {

					cb(null, res);	

				});
					
			}

		});
		
	},

	getImageUrl: function (id, isThumbnail, width, height) {
		if (isThumbnail) {
			return 'https://res.cloudinary.com/dmktcahwt/image/upload/w_' + width + ',h_' + height + ',c_thumb,g_face/' + id;	
		} else {
			return 'https://res.cloudinary.com/dmktcahwt/image/upload/' + id;
		}
		
	},
	
	getAllImages: function (listFile, cb) {
		
		var file = './data/' + listFile;
		var csvData = [];

		//read in list of ids
		fs.createReadStream(file)
			.pipe(parse({delimiter: ','}))
			.on('data', function(csvrow) {

				if (csvrow == 'audits/khkcc4fpb6xdr6qdslow' || csvData.length > 0) {
					csvData.push(csvrow);  
				}
				      
		})
		.on('end',function() {
			cb(null, csvData);
		});
		
	},
	
	downloadImage: function (uri, filename, callback) {
		
		request.head(uri, function(err, res, body){

			//console.log('content-type:', res.headers['content-type']);
			//console.log('content-length:', res.headers['content-length']);
		
			request(uri)
				.pipe(fs.createWriteStream(filename))
				.on('error', function(err) {
					console.log(err)
				})
				.on('close', callback);

		});
		
	},

	downloadAllImages: function (imageList, isThumbnail, cb) {

		var $self = this;

		async.mapSeries(imageList, function (image, callback) {

			var url = $self.getImageUrl(image, isThumbnail, 150, 150);

			console.log('image: ', url);

			var name = 'data/' + image;

			name += (isThumbnail ? '_t.jpg' : '.jpg' );

			//setTimeout(function(){

				$self.downloadImage(url, name, function(){

					console.log('downloaded: ', image);

					//upload to s3
					callback(null, true)

				});

			//}, 500);

		}, 
		function(err, results) {
		    // results is now an array of stats for each file


		    cb(null, true)

		});

	}
	
};

module.exports = imageLib;