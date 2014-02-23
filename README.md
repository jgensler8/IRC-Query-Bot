**IRC bot**
==========

Options Supported:

| Status | Option | Description |
| --- | --- | --- |
| working | SWAP ROLE | switch the bot to handle ALICE conversations or querying |
| working | GET ROLE | return the role the bot is in (default is query) |
| working\* | TITLE | basic query of the English Wikipedia |
| in progress | TOPIC | data aggregation for topic | 
| in progress | RANDOM | fetch random article |
\*I am in the process of refactoring my old code. Will be running in a week or so

##How to run:##

1. edit the options in irc_options.json
```
{
  "bot": {
    "name": "BOTLEY" // or other
    "channel":"#bot" // or any other channel
    "channelPass": ""
  },
  "connection": {
    port: 6667 // or other
    host: '10.0.2.15' // or freenode.net
  }
}
```
2.  assuming you have node.js, a simple:
```
$ node irc_bot.js
```
##How to query:##
1. when the bot has connected to the IRC channel, send a message in this format
```
SEARCH TITLE $title_goes_here
SEARCH TOPIC $topic_goes_here
SEARCH RANDOM $
```
