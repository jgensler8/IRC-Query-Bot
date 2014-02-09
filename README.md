**IRC bot**
==========

Options Supported:

| Status | Option | Description |
| --- | --- | --- |
| working | TITLE | basic query of the English Wikipedia |
| in progress | TOPIC | data aggregation for topic | 
| in progress | RANDOM | fetch random article |

##How to run:##

1. edit the options in index.js
```
var botley = {
  name: "BOTLEY" // or other
  channel: "#bot" // or any other channel
}
var irc_options = {
  port: 6667 // or other
  host: '10.0.2.15' // or freenode.net
}
```
2.  assuming you have node.js, a simple:
```
$ node index.js
```
##How to query:##
1. when the bot has connected to the IRC channel, send a message in this format
```
SEARCH TITLE $title_goes_here
SEARCH TOPIC $topic_goes_here
SEARCH RANDOM $
```

