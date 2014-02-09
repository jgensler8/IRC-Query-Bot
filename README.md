**IRC bot**
==========
Options Supported:
- [x]querying the English Wikipedia
- [] data aggregation for search topic
- [] fetch random article

##How to run:##

1. edit the options in index.js
```
var botley = {
  name: "BOTLEY"
  channel: "#bot" // or any other channel
}
var irc_options = {
  port: 6667
  host: '10.0.2.15' // or freenode.net
}
```
2.  assuming you have node.js, a simple:
```
./node index.js
```
##How to query:##
1. when the bot has connected
```
SEARCH TITLE $title_goes_here
SEARCH TOPIC $topic_goes_here
SEARCH RANDOM $
```

