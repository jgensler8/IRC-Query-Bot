var botley = {
  name: "BOTLEY",
  channel: "#bot",
};

var irc_options = {
  port: 6667,
  host: '10.0.2.15'
};

var wiki_options = {
  port: 80,
  host: 'en.wikipedia.org',
  path: '/',
  method: 'GET'
}

// defining local json file
//var path = "/home/user/cs/javascript/"
var response_file = require("./responses.json");
console.log( response_file );

// open the IRC socket
var net = require('net');
var socket = net.connect( irc_options);
socket.setTimeout(10000);

// open the Wiki socket
var http = require('http');

// socket listeners
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
  socket.write("USER " + botley.name + " 8 *:" + botley.name +" \n");
  socket.write("NICK " + botley.name + "\n");
  socket.write("JOIN " + botley.channel + "\n");
  console.log("***ATTEMPT FINISHED***");
});

// easy forming of a message to be sent to the IRC server
function privmsg(bot, message){
  return "PRIVMSG " + bot.channel + " :" + message + "\r\n";
}


// query the english wiki
function hit_wiki( qPath, callback){
  //console.log("***SETTING PATH TO: " + qPath + " ***");
  wiki_options.path = qPath;
  var wiki_data = '';
  var wiki_request = http.get( wiki_options, function(res){
    res.on('data', function(data){
      wiki_data += data; //the data comes in chunks
    });
    res.on('end', function(nothing){
      var wiki_json = JSON.parse( wiki_data);
      callback( wiki_json);
    });
  });
  wiki_request.on('error', function(e){
    socket.write( privmsg( botley, "***THE REQEUST HAS FAILED***") );
  });
}

//construct the query from a JSON object of options
function build_query( prepend, obj, postpend){
  var query = "";
  query += prepend;
  for( parameter in obj)
    query += parameter + "=" + obj[parameter] + "&";
  query += postpend;
  return query;
}

//figure out the query option + then hit the wiki
function sortAndHit( cmds, keyword, searchTerm){
  switch(keyword){
    case "TOPIC":
      hit_wiki( build_query( "/w/api.php?", response_file.query_wiki[cmds][keyword], "titles=" + searchTerm ), s_topic_callback);
      break;
    case "RANDOM":
      hit_wiki( build_query( "/w/api.php?", response_file.query_wiki[cmds][keyword], ''), s_random_callback);
      break;
    case "TITLE":
      hit_wiki( build_query( "/w/api.php?", response_file.query_wiki[cmds][keyword], "titles=" + searchTerm ), s_title_callback);
      break;
  }
}

var s_topic_callback = function search_topic( data){
  //TODO
}

var s_random_callback = function search_random( data){
  //TODO
}

var s_title_callback = function search_title( data){
  console.log("from the callback");
  for( page in wiki_json.query.pages){
    var extract = wiki_json.query.pages[page].extract;
    //extract.split(
    socket.write( privmsg( botley, extract));
  } 
}

//parse the message to find out what to send to IRC server
function parse_message(message){
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
  //is the user trying to query wikipdia
  for( cmds in response_file.query_wiki){
    if( -1 !== message.indexOf( cmds) ){
      console.log("***PARSED A WIKI SEARCH***");
      for( keyword in response_file.query_wiki[cmds] ){
        if( -1 !== message.indexOf( keyword) ){
          console.log("***PARSED A KEYWORD***");
          var start = message.indexOf('$');
          var end = message.indexOf('\r\n');
          if( start != -1 && end != -1) //search term sliced out
            var searchTerm = message.slice(start+1, end);
          else return "REQUEST FAILED";
          sortAndHit( cmds, keyword, searchTerm);
          return "SENDING REQUEST..."; 
        }
      }
    }    
  }
  return "I don't understand what you mean."
}