#!/bin/bash
# This script outputs how many players are currently playing Team Fortress 2.

URL="https://steamcharts.com/app/440"

# We need a temp file in order to echo a curl
temp_file=$(mktemp)
curl -s "$URL" > "$temp_file"

# Use grep and awk to extract current players from div class in source code via https://steamcharts.com/app/440
# the 'app-stat' div hosts the current player count
player_count=$(grep -A 1 "app-stat\">" "$temp_file" | grep -o "<span class=\"num\">[0-9]\+" | awk -F'>' '{print $2}')

echo "Current player count for app 440: $player_count"

# Clean up the temporary file used by curl.
rm -f "$temp_file"
