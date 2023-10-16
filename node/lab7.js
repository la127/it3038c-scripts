// This script fetches data from a government car api

const readline = require('readline');
const axios = require('axios');
const chalk = require('chalk');
const fs = require('fs');

const apiUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvaluesextended/';

// Create an interface to read user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Fetch data from the NHTSA API
async function fetchData(vin) {
  try {
    const response = await axios.get(apiUrl + vin + '?format=json');
    return response.data.Results[0];
  } catch (error) {
    throw error;
  }
}

// Colorize and display vehicle data
function displayData(data) {
  console.log(chalk.blue('Make: ') + chalk.green(data.Make));
  console.log(chalk.blue('Model: ') + chalk.yellow(data.Model));
  console.log(chalk.blue('Year: ') + chalk.yellow(data.ModelYear));
  console.log(chalk.blue('Trim: ') + chalk.yellow(data.Trim));
}

// Save vehicle data to a file
function saveToFile(data) {
  fs.writeFile('vehicle_data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error(chalk.red('Error saving data to file.'));
    } else {
      console.log(chalk.green('Vehicle data saved to vehicle_data.json'));
    }
  });
}

// Main script
async function main() {
  rl.question('Enter a VIN (Vehicle Identification Number) or press Enter for default: ', async (vin) => {
    if (!vin) {
      // supply default VIN
      vin = '1HGCM82633A123456';
    }

    try {
      const data = await fetchData(vin);
      displayData(data);
      saveToFile(data);
    } catch (error) {
      console.error(chalk.red('An error occurred:'), error.message);
    } finally {
      rl.close(); // Close readline interface
    }
  });
}

main();
