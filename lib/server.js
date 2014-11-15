var http = require('http');
var fs = require('fs');
var path = require('path');
var socket = require('./socket');





function requestHandler(req,res){
	var url = req.url;
	console.log(url)
	switch(url){
		case "/":{
			var filepath = path.resolve('./public/index.html');
			fs.readFile(filepath,function(err,data){
				if(err){
					console.log(err)
					res.end("Error occured");
				}else{
					res.writeHead(200,{'content-type':'text/html'});
					res.end(data);		
				}
			})
		}break;


		case "/rtc":{

			var filepath = path.resolve('./public/views/rtc.html');
			fs.readFile(filepath,function(err,data){
				if(err){
					console.log(err)
					res.end("Error occured");
				}else{
					res.writeHead(200,{'content-type':'text/html'});
					res.end(data);		
				}
			})
		}break
	}
			
	
}

function notify(msg){
	console.log(msg)
}


function Server(){
	this.port = new Number();
}

Server.prototype.init = function(port){
	this.port = port;
	var server = http.createServer(requestHandler);

	socket.initSocket(server);

	server.listen(this.port,notify('server started on port : '+this.port));

}
module.exports = new Server();