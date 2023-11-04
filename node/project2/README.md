# Project 2

This NodeJS script takes your hardware info, opens your web browser, and prints it onto a colorful webpage

## Instructions
1. Download NodeJS, LTS or normal is fine.
2. Clone the repo
3. Open the repo folder in Terminal and run ```npm install opn systeminformation```
4. Use that same terminal to run ```node ./script.js```
5. Your web browser will open and show your computer specs.

![image](https://github.com/lh1207/it3038c-scripts/assets/100445409/d595728f-1e7f-4252-aee5-5db97eca2b7e)

## How does this script work?
This script utilizes NodeJS package systeminformation to parse your system specifications into a JSON file. This is then parsed for only the name of each part, which is then printed onto the styled css/html page. NodeJS package opn is also used to simplify the process and make the browser open immediately to localhost:3000/hardware-info, which stores the parsed data.
