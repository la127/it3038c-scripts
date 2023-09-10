#!/bin/bash
# This script downloads covid data and displays it
# Levi Huff
# 9/10/2023
# Lab 2

DATA=$(curl https://api.covidtracking.com/v1/us/current.json)
POSITIVE=$(echo $DATA | jq '.[0].positive')
TODAY=$(date)
HOSPITALIZEDINCREASE=$(echo $DATA |jq '.[0].hospitalizedIncrease')
NEGATIVE=$(echo $DATA | jq '.[0].negative')
NEGATIVEINCREASE=$(echo $DATA | jq '.[0].negativeIncrease')
HOSPITALIZEDCURRENTLY=$(echo $DATA | jq '.[0].hospitalizedCurrently')
PENDING=$(echo $DATA | jq '.[0].pending')

echo "On $TODAY, there were $POSITIVE positive cases reported, along with an increase of $HOSPITALIZEDINCREASE hospital patients. 
However, $NEGATIVE negative cases, along with a negative decrease of $NEGATIVEINCREASE hospital patients, have been reported.
In other news, there are currently $HOSPITALIZEDCURRENTLY patients hospitialized, with $PENDING patients pending for admission."
