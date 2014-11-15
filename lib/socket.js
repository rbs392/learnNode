var socketIo = require('socket.io');
var fs = require('fs');

exports.initSocket = function(server){

	var io = new socketIo(server);

	
	io.on('connection',function(socket){
		socket.emit('news','hello');
		socket.on('msg',function(data){
			socket.emit('reply',data);
		})
	})


}
		


