/*
 * This is an IRC chat bot build on Node.js
 */

//local options about what role the bot is playing
var role = {
  alice: false,
  query: true
}

// optional logging flag
var logOn = true;
function log( string){
  if(logOn) console.log(string);
}

// load irc option files
var irc_opt = require("./src/options/irc_options.json");
var alice = require("./src/alice.js");
var queyr = require("./src/query.js");

// open the IRC socket
var net_irc = require('net');
var socket_irc = net_irc.connect( irc_opt.connection );
socket_irc.on('data', onIRCData);
socket_irc.on('connect', onIRCConnect);

//socket.write( "PRIVMSG " + irc_opt.channel + " :" + parse_message(message) + "\r\n";

//when we connect to the IRC server, authenticate
function onIRCConnect(){
  log("***ATTEMPTING CONNECTION***");
  //socket_irc.write("PASS : " + irc_opt.bot.channelPass + "\n");
  socket_irc.write("USER " + irc_opt.bot.name + " 8 * : " + irc_opt.bot.name +" \n");
  socket_irc.write("NICK " + irc_opt.bot.name + "\n");
  socket_irc.write("JOIN " + irc_opt.bot.channel + "\n");
  log("***ATTEMPT FINISHED***");
}

//when we receive data, divide into IRC vs human message
function onIRCData(data){
    var message = data.toString();
    //log("***GOT DATA*** " + message); 
    if( message.match( /PING :/ ) ){
      log("Ping received!");
      socket_irc.write("PONG");
    }
    else if( message.match( /PONG/ )){
      log("Pong received");
      socket_rc.write("PING");
    }
    else handle_message_role(message);
}

//when we receive data, check if it is trying
//to change local options then see if 
function handle_message_role( message){
  if( is_option_change( message) ){}
  else if( role.alice) resolve_alice( message);
  else if( role.query) resolve_query( message);
}

//check if we are trying to change an option
//return false otherwise
function is_option_change( message){
  if( message.match(/SWAP ROLE/)){
    log("***CHANGING ROLE TO ***");
    role.alice = !role.alice;
    role.query = !role.query;
    if( role.alice) log("*** alice***");
    else log("*** query***");  
    return true;
  }
  return false;
}

// resolve a query that the bot received form IRC
function resolve_query( message){
  log(message);
}

// resolve a query that the bot received form IRC
function resolve_alice( message){
  log(message);
}
