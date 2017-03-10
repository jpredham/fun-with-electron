// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {desktopCapturer} = require('electron')

var camera = document.getElementById('camera')
var canvas = document.getElementById('canvas')
var draw = document.getElementById('draw')
var streaming = false;


navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(function(stream){
  camera.src = URL.createObjectURL(stream);
  var mediaTracks = stream.getTracks();
  for (let i = 0; i < mediaTracks.length; ++i) {
      console.log(mediaTracks[i]);
  }
  camera.play();
}).catch(function(e){
  console.log(e)
});


camera.addEventListener('canplay', function(ev){
  if (!streaming) {
      height = camera.videoHeight;
      width = camera.videoWidth;
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      draw.setAttribute('width', width);
      draw.setAttribute('height', height);
      streaming = true;
      capture();
  }
}, false);

function capture() {
  var context = canvas.getContext('2d');
  // Capture the current output of the camera, and draw it to our canvs
  context.drawImage(camera, 0, 0, camera.videoWidth, camera.videoHeight);
  // Convert the canvas to base64 data
  var data = canvas.toDataURL('image/png');
  // call our detect method
  detect(data);
}

function detect(imgData) {
  // Post the encoded image to the API to get back the result.
}
