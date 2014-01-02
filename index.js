var botley = {
  name: "BOTLEY",
  channel: "#bot",
};

var options = {
  port: 6667,
  host: '10.0.2.15'
};

var path = "/home/user/cs/javascript/"
var response_file = require( path + "responses.json");
console.log( response_file );

var net = require('net');
var socket = net.connect( options);
socket.setTimeout(10000);

socket.on('data', function(data){
    var message = data.toString();
    console.log("***GOT DATA*** " + message);
    
    if( message.match( /PING :/ ) ){
      console.log("Ping received!");
      socket.write("PONG");
    }
    else if( message.match( /PONG/ )){
      console.log("Pong received");
      socket.write("PING");
    }
    else{
      socket.write( privmsg(botley, parse_message( message)) );
    }
  });

socket.on('connect', function(){
  console.log("***ATTEMPTING CONNECTION***");
  //socket.write("PASS :\n");
  socket.write("USER " + botley.name + " 8 *:JEFFS BOT \n");
  socket.write("NICK " + botley.name + "\n");
  socket.write("JOIN " + botley.channel + "\n");
  console.log("***ATTEMPT FINISHED***");
});

function privmsg(bot, message){
  return "PRIVMSG " + bot.channel + " :" + message + "\r\n";
}

function parse_message(message){
  //find out what question it is
  for( inter in response_file.interrogatives ){
    console.log( inter);
    if( -1 !== message.indexOf(inter) ){
      console.log("found a match");
      for( var keyword in response_file.interrogatives[inter] ){
        console.log(keyword);
        if( -1 !== message.indexOf( keyword) ){
          return response_file.interrogatives[inter][keyword];
        }
      }
      break;
    }
  }
  return "I didn't understand what you mean."
}
