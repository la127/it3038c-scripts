const http = require('http');
const os = require('os');

// Initalize NodeJS Server, from NodeJS documentation
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  const hostname = os.hostname();

  // IP Address
  const networkInterfaces = os.networkInterfaces();
  const ipAddress = networkInterfaces['en0'][0].address;

  // Server Uptime
  const uptime = os.uptime();
  const days = Math.floor(uptime / 86400);
  const hours = Math.floor((uptime % 86400) / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);

  // Total Memory
  const totalMemory = (os.totalmem() / (1024 * 1024)).toFixed(2);

  // Free Memory
  const freeMemory = (os.freemem() / (1024 * 1024)).toFixed(2);

  // CPUs
  const numCPUs = os.cpus().length;

  const response = `
    Hostname: ${hostname}
    IP: ${ipAddress}
    Server Uptime Stats: ${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds
    Total Memory: ${totalMemory} MB
    Free Memory: ${freeMemory} MB
    CPUs: ${numCPUs}
  `;

  res.end(response);
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
