#!/bin/bash

#CURL VARS
UA="\"Mozilla/5.0\""
INIT_URL="http://www.omegle.com"
COOKIE_FILE="cookie_jar"
#AWK VARS
AWKFILE="extract_randid.awk"

function start {
  curl $INIT_URL --user-agent $UA
  curl --cookie $INIT_URL --user-agent $UA --cookie-jar $COOKIE_FILE
  #awk creates a file named "randid" which contains the randid
  awk -f $AWKFILE < $COOKIE_FILE
  cat "randid"
}
