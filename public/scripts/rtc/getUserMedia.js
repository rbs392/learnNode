var video = document.querySelector('video');

navigator.getUserMedia = navigator.getUserMedia ||
	navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

navigator.getUserMedia({video:true,audio:true},function(stream){
	window.stream = stream;

	if(window.URL){
		video.src = window.URL.createObjectURL(stream);
	}else{
		video.src=stream
	}
	video.play();
},function(error){
	alert("RTC not supported");
})