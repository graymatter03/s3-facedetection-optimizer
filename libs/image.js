var request = require('request');
var fs = require('fs');
var xlsx = require('node-xlsx');
var parse = require('csv-parse');
var async = require('async');


var imageLib = {
	
	optimizeImages: function (listFile, cb) {
		
		var $self = this;

		//get images
		var images = this.getAllImages(listFile, function (err, res){

			if (err) {
				cb(err, null);	
			} else {
				
				$self.downloadAllImages(res, function(err, res) {

					cb(null, res);	

				});
					
			}

		});
		
	},

	getImageUrl: function (id, width, height) {
		return 'https://res.cloudinary.com/dmktcahwt/image/upload/w_' + width + ',h_' + height + ',c_thumb,g_face/' + id;
	},
	
	getAllImages: function (listFile, cb) {
		
		
		var file = './data/' + listFile;
		var csvData = [];

		//read in list of ids
		fs.createReadStream(file)
			.pipe(parse({delimiter: ','}))
			.on('data', function(csvrow) {
				csvData.push(csvrow);        
		})
		.on('end',function() {
			cb(null, csvData);
		});
		
	},
	
	downloadImage: function (uri, filename, callback) {
		
		request.head(uri, function(err, res, body){

			//console.log('content-type:', res.headers['content-type']);
			//console.log('content-length:', res.headers['content-length']);
		
			request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);

		});
		
	},

	downloadAllImages: function (imageList, cb) {

		var $self = this;

		async.map(imageList, function (image, callback) {

			var url = $self.getImageUrl(image, 150, 150);

			console.log('image: ', url);

			$self.downloadImage(url, 'data/' + image + '_t.jpg', function(){

				console.log('downloaded: ', image);

				//upload to s3
				callback(null, true)

			});

		}, 
		function(err, results) {
		    // results is now an array of stats for each file


		    cb(null, true)

		});

	}
	
};

module.exports = imageLib;