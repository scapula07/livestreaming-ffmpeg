const child_process = require('child_process');
const http = require('http');
const WebSocketServer = require('ws').Server;
const fs = require("fs");

const wss = new WebSocketServer({
  port:5001
});


wss.on('connection', (ws, req) => {

  const ffmpeg = child_process.spawn('ffmpeg', [
       
    // '-f', 'lavfi', '-i', 'anullsrc',
    

    // '-i', '-',
   '-i', '-', '-v', 'error',

    
    // '-shortest',
    

    // '-vcodec', 'copy',
    
   
    // '-acodec', 'aac',
 
    // '-f', 'flv',
    
    // 'rtmp://rtmp.livepeer.com/live/5421-cpzy-1w4f-grwt',
    // "rtmp://a.rtmp.youtube.com/live2/admv-yg7c-gd0s-566q-07s3"
    // 'browser.flv',

  //   '-vcodec','libx264', '-pix_fmt','yuv420p', '-preset' ,'medium', '-r', '30 ' ,'-g', '60', '-b:v', '2500k',
  //   '-acodec', 'libmp3lame', '-ar','44100', '-threads' ,'6','-qscale' ,'3' ,'-b:a' ,'712000','-bufsize', '512k',
  // '-f','flv', 'rtmp://rtmp.livepeer.com/live/5421-cpzy-1w4f-grwt'

  // '-c:v',
  // 'libx264',
  // '-preset',
  // 'veryfast',
  // '-tune',
  // 'zerolatency',
  // '-g:v',
  // '60',

  // // audio codec config: sampling frequency (11025, 22050, 44100), bitrate 64 kbits
  // '-c:a',
  // 'aac',
  // '-strict',
  // '-2',
  // '-ar',
  // '44100',
  // '-b:a',
  // '64k',

  // //force to overwrite
  // '-y',

  // // used for audio sync
  // '-use_wallclock_as_timestamps',
  // '1',
  // '-async',
  // '1',

  // '-f',
  // 'flv',

'-c:v', 'libx264', '-x264-params', 'keyint=60:no-scenecut=1' ,'-c:a', 'copy', '-f', 'flv',
'rtmp://rtmp.livepeer.com/live/d40f-3nc3-sl74-ja7t'

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
    console.log('DATA Transcoding', msg);
    ffmpeg.stdin.write(msg);
  });
  
  wss.on('close', (e) => {
    ffmpeg.kill('SIGINT');
  });

  ffmpeg.stdout.on('data', function(data) {
    console.log( data.toString(),"data out");
  
   
  });
  
});
