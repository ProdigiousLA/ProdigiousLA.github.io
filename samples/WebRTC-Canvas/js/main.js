/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

'use strict';

// Put variables in global scope to make them available to the browser console.
var video = document.querySelector('video');
var canvas = window.canvas = document.querySelector('canvas');

// Canvas setup
canvas.width = 480;
canvas.height = 360;

// Setup parameters needed for getUserMedia() method
var constraints = {
    audio: false,
    video: true
  };

// Listener for capturing the video and put it into the canvas element
var button = document.querySelector('button');
button.onclick = function() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d')
        .drawImage(video, 0, 0, canvas.width, canvas.height);
  // Adding the Prodigious touch ;)
  loadProdigiousImage();
};

function loadProdigiousImage(){
    var img = new Image();
    img.src = 'images/prodigious.png';
    img.onload = function() {
        canvas.getContext('2d')
              .drawImage(img, 460, 10);
        img.style.display = 'none';
      };
      
}


// If the user accept the access to the webcam
function handleSuccess(stream) {
  window.stream = stream; // make stream available to browser console
  video.srcObject = stream;
}

// If you don't want to see your smiling face into the browser :'( 
function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}


// Browser request to get access to the webcam with getUserMedia
// We handle 2 promises, the success and the error
navigator.mediaDevices
    .getUserMedia(constraints)
    .then(handleSuccess)
    .catch(handleError);


// Event handler for the download link. We get the data from the canvas and we download the file as a PNG
document.getElementById('btn-download').addEventListener('click', function() {
    this.href = canvas.toDataURL();
    this.download = 'my-prodigious-image.png';
}, false);

console.log('--------------- \nProdigious.com  \n  Thanks for inspecting the code.');
console.log('  Take a look at these interesting JS values: \n   >  stream \n   >  canvas.toDataURL()');
console.log('--------------- \n')