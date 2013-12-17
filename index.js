var botname = "BOTLEY";
var channel = "#bot";
var options = {
  port: 6667,
  host: '10.0.2.15'
  };
var net = require('net');
var socket = net.connect( options);
socket.setTimeout(10000);

/*
socket.on('/*PING*', function(){
    console.log("ping received");
    socket.write('PONG\n');
 });

socket.on('PONG', function(){
    console.log("pong received");
    socket.write('PING\n');
 });
*/

socket.on('data', function(data){
    console.log("***GOT DATA***");
    console.log( data.toString()  );
  });

socket.on('connect', function(){
  console.log("connected");
  //socket.write("PASS :\n");
  socket.write("USER " + botname + " 8 *:JEFFS BOT \n");
  socket.write("NICK " + botname + "\n");
  socket.write("JOIN " + channel + "\n");
  console.log("all done");
});
