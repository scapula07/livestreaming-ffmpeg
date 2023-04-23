const child_process = require('child_process'); // To be used later for running FFmpeg
const express = require('express');
const http = require('http');
const WebSocketServer = require('ws').Server;



const wss = new WebSocketServer({
  port:5001
});


wss.on('connection', (ws, req) => {

  const ffmpeg = child_process.spawn('ffmpeg', [
       
    // '-f', 'lavfi', '-i', 'anullsrc',
    

    '-i', '-',
    
    // '-shortest',
    

    '-vcodec', 'copy',
    
   
    '-acodec', 'aac',
 
    '-f', 'flv',
    
    
    'vid.flv',
 
   ])




   ffmpeg.on('close', (code, signal) => {
    console.log('FFmpeg child process closed, code ' + code + ', signal ' + signal);
    ws.terminate();
    });
  
  
  ffmpeg.stdin.on('error', (e) => {
    console.log('FFmpeg STDIN Error', e);
  });
  
  ffmpeg.stderr.on('error', (e) => {
    console.log('FFmpeg STDERR first:', e);
  });

  ffmpeg.stderr.on('data', (data) => {
    console.log('FFmpeg STDERR:', data.toString());
  });

 
  ws.on('message', (msg) => {
    console.log('DATA', msg);
    ffmpeg.stdin.write(msg);
  });
  
  wss.on('close', (e) => {
    ffmpeg.kill('SIGINT');
  });
  
});



  


