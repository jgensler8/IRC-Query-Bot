/*
 * this file dicates how the query function will work
 */
module.exports = {
  resolve_query: function( message, writeTo){
    writeTo("inside the query.js");
  }
}


// open the Wiki socket
var http_query = require('http');

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
function resolve_query(message, writeTo){
  /*
  //is the user trying to query wikipdia
  for( cmds in response_file.query_wiki){
    if( -1 !== message.indexOf( cmds) ){
      log("***PARSED A WIKI SEARCH***");
      for( keyword in response_file.query_wiki[cmds] ){
        if( -1 !== message.indexOf( keyword) ){
          log("***PARSED A KEYWORD***");
          var start = message.indexOf('$');
          var end = message.indexOf('\r\n');
          if( start != -1 && end != -1) //search term sliced out
            var searchTerm = message.slice(start+1, end);
          sortAndHit( cmds, keyword, searchTerm);
        }
      }
    }    
  }
  */
  writeTo("got a query");
}
