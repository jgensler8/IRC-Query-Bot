#!/bin/awk
{
  randid_file="randid"
  if( /shard2/ ){
    #echo the randid into a file
    sub(/randid=/, "", $0);
    system("echo "$0" > "randid_file" ");
  }
}
