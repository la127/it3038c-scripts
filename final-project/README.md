# Team Fortress 2 Player Counts Project

Welcome to the Team Fortress 2 Player Counts project! This project provides a simple API to retrieve Team Fortress 2 player counts and a Python CLI to visualize the player counts over time. This README provides instructions on how to set up and run the project on Windows, macOS, and Linux using various package managers.

## Impact
This application is useful because it provides a visual representation of the amount of users playing Team Fortress 2, which shows the power of not only Python for data representation, but also NodeJS and JSON for presistent data through an API and local JSON file.

## Table of Contents
- [TF2 Player Counts Project](#team-fortress-2-player-counts-project)
  - [Impact](#impact)
  - [Table of Contents](#table-of-contents)
  - [Dependencies](#dependencies)
  - [Example](#example)
  - [Installation](#installation)
    - [Clone the Git Repository](#clone-the-git-repository)
    - [Install Dependencies](#install-dependencies)
      - [Node.js Dependencies (API)](#nodejs-dependencies-api)
    - [Python Dependencies](#python-dependencies)
      - [Windows / Mac OS](#windows--mac-os)
      - [Linux](#linux)
      - [Arch based distributions](#arch-based-distributions)
      - [Debian based distributions](#debian-based-distributions)
      - [CentOS based distributions](#centos-based-distributions)
  - [Running the Program](#running-the-program)
    - [Running the API](#running-the-api)
    - [Running the CLI](#running-the-cli)
  - [Api Documentation](#api-documentation)

## Example
![image](https://github.com/lh1207/it3038c-scripts/assets/100445409/578ead65-6245-4d23-b16e-bbd55c89f2e2)

## Dependencies
The project has the following dependencies:
- [Node.js](https://nodejs.org/) (for the API)
- [Python 3](https://www.python.org/) (for the Python CLI)
- [npm](https://www.npmjs.com/) (Node.js package manager)
- [pip](https://pip.pypa.io/) (Python package installer)

## Installation

### Clone the Git Repository
```bash
git clone https://github.com/lh1207/it3038c-scripts/
cd it3080c-scripts/final-project
```

### Install Dependencies

#### Node.js Dependencies (API)
```bash
# Install Node.js dependencies
npm install express body-parser swagger-ui-express swagger-jsdoc axios fs
```

### Python Dependencies

#### Windows / Mac OS
```cmd
# Navigate to the final-project directory
cd final-project

# Install Python dependencies from elevated terminal
pip install -r requirements.txt
```

#### Linux

#### Arch based distributions
```bash
# Navigate to the final-project directory
cd final-project
sudo pacman -S python-requests python-matplotlib python-numpy python-gobject python-qt5 
```

#### Debian based distributions
```bash
# Navigate to the final-project directory
cd final-project
sudo apt install python3-requests python3-matplotlib python3-numpy python3-gobject python3-qt5
```

#### CentOS based distributions
```bash
# Navigate to the final-project directory
cd final-project
sudo pip install -r requirements.txt
# or use Yum.
```

## Running the Program

### Running the API
```bash
# Navigate to the final-project directory
cd final-project

# Run the API
node index.js
```
The API will be accessible at http://localhost:3000. The Swagger documentation can be viewed at http://localhost:3000/api-docs.

### Running the CLI
```bash
# Navigate to the final-project directory
cd final-project

# Run the Python CLI
python fetch.py
```
The Python CLI will fetch and display the TF2 player counts and generate a plot showing the counts over time.

## API Documentation
The API documentation is available at http://localhost:3000/api-docs when the API is running. It provides details on the available endpoints and how to use them.

Feel free to explore and enjoy the TF2 Player Counts project! If you encounter any issues or have questions, please check the GitHub repository for support.
