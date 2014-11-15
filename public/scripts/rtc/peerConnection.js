var localStream,remoteStream,remotePeerConnection;

var localVideo = document.getElementById('localvideo');
var remoteVideo = document.getElementById('remotevideo');

//CHROME
if (navigator.webkitGetUserMedia) {
RTCPeerConnection = webkitRTCPeerConnection;
// Firefox
} else if(navigator.mozGetUserMedia){
RTCPeerConnection = mozRTCPeerConnection;
RTCSessionDescription = mozRTCSessionDescription;
RTCIceCandidate = mozRTCIceCandidate;
}


var servers = null;

localPeerConnection = new RTCPeerConnection(servers);
remotePeerConnection = new RTCPeerConnection(servers);

localPeerConnection.onicecandidate = function(event){
	if (event.candidate) {
	remotePeerConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
	console.log("Local ICE candidate: \n" + event.candidate.candidate);
	}
}

remotePeerConnection.onicecandidate = function(event){
	if (event.candidate) {
	localPeerConnection.addIceCandidate(new RTCIceCandidate(event.candidate));

	console.log("Remote ICE candidate: \n " + event.candidate.candidate);
	}
}
remotePeerConnection.onaddstream = function(event){
	// Associate the remote video element with the retrieved stream
	if (window.URL) {
	// Chrome
	remoteVideo.src = window.URL.createObjectURL(event.stream);
	} else {
	// Firefox
	remoteVideo.src = event.stream;
	}
	log("Received remote stream");
}

localPeerConnection.addStream(localStream);

localPeerConnection.createOffer(function(description){
	
	localPeerConnection.setLocalDescription(description);
	remotePeerConnection.setRemoteDescription(description);
	
});