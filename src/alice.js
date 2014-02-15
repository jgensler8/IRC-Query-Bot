/*
 * this file dictates how the ALICE style conversation
 * will work.
 */

var alice_file = require("./options/alice_options.json");

//parse the message to find out what to send to IRC server
function resolve_message(message){
  //is the users question about the bot
  for( question in response_file.interrogatives ){
    if( -1 !== message.indexOf(question) ){
      for( var keyword in response_file.interrogatives[question] ){
        if( -1 !== message.indexOf( keyword) ){
          return response_file.interrogatives[question][keyword];
        }
      }
    }
  }
  return "I don't understand what you mean."
}
