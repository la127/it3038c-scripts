# NHTSA Vehicle API Data Retrieval

This is a Node.js script that allows you to retrieve vehicle data from the National Highway Traffic Safety Administration (NHTSA) API by providing a Vehicle Identification Number (VIN). If no VIN is provided, it will use a default VIN.

## Prerequisites

- Node.js installed on your system
- npm (Node Package Manager)

## How to Use

1. Clone or download the script to your local machine.

2. Open your terminal or command prompt and navigate to the script's directory.

3. Install the required dependencies:

```bash
npm install axios chalk
```

4. Run the script:
```bash
node lab7.sh
```

5. You will be prompted to enter a VIN (Vehicle Identification Number). You can either enter a VIN or press Enter to use the default VIN.

6. The script will then fetch data from the NHTSA API, display the vehicle information, and save it to a JSON file.

7. Check the generated vehicle_data.json file for the saved vehicle information.
