/*
 * this file dictates how the ALICE style conversation
 * will work.
 */
module.exports = {
  resolve_query: function( message, writeTo){
    writeTo( resolve_message( message));
  }
} 

var response_file = require("./alice_options.json");

//parse the message to find out what to send to IRC server
function resolve_message(message){
  //is the users question about the bot
  for( question in response_file ){
    if( -1 !== message.indexOf(question) ){
      for( var keyword in response_file[question] ){
        if( -1 !== message.indexOf( keyword) ){
          return response_file[question][keyword];
        }
      }
    }
  }
  return "I don't understand what you mean."
}
