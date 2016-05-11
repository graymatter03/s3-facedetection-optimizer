var request = require('request');
var fs = require('fs');


var imageLib = {
	
	optimizeImages: function () {
			

		/*this.downloadImage('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
		
		});*/

		
	},
	
	getAllImages: function () {
		
		
		
	},
	
	downloadImage: function (uri, filename, callback) {
		
		request.head(uri, function(err, res, body){
			console.log('content-type:', res.headers['content-type']);
			console.log('content-length:', res.headers['content-length']);
		
			request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
		});
		
	}
	
};

module.exports = imageLib;