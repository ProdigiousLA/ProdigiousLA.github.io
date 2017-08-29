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
canvas.width = 480;
canvas.height = 360;

var button = document.querySelector('button');
button.onclick = function() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').
    drawImage(video, 0, 0, canvas.width, canvas.height);
  loadProdigiousImage();
};

var constraints = {
  audio: false,
  video: true
};

function handleSuccess(stream) {
  window.stream = stream; // make stream available to browser console
  video.srcObject = stream;
}

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

function loadProdigiousImage(){
    var img = new Image();
    img.src = 'images/prodigious.png';
    img.onload = function() {
        canvas.getContext('2d').
            drawImage(img, 420, 20);
        img.style.display = 'none';
      };
      
}

navigator.mediaDevices.getUserMedia(constraints).
    then(handleSuccess).catch(handleError);



  /** 
   * The event handler for the link's onclick event. We give THIS as a
   * parameter (=the link element), ID of the canvas and a filename.
  */
  document.getElementById('btn-download').addEventListener('click', function() {
    //   downloadCanvas(this, 'canvas', 'test.png');
    this.href = canvas.toDataURL();
    link.download = 'my-prodigious-image.png';
  }, false);