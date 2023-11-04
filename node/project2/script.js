const si = require('systeminformation'); // npm install systeminformation

async function fetchHardwareInfo() {
  try {
    const cpuData = await si.cpu();
    const memData = await si.mem();
    const diskData = await si.diskLayout();
    const batteryData = await si.battery();
    const graphicsData = await si.graphics();
    const osData = await si.osInfo();
    const networkData = await si.networkInterfaces();

    // object for data
    const hardwareInfo = {
      cpu: cpuData,
      memory: memData,
      disks: diskData,
      battery: batteryData,
      graphics: graphicsData,
      os: osData,
      network: networkData,
    };

    return hardwareInfo;
  } catch (error) {
    console.error('Error fetching hardware information:', error);
    return null;
  }
}

async function updateHardwareInfo() {
  setInterval(async () => {
    const info = await fetchHardwareInfo();
    console.log('Updated hardware information:', info);
  }, 5000);
}

updateHardwareInfo();

// NodeJS server code
const http = require('http');

http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });

  if (req.url === '/hardware-info') {
    const hardwareInfo = await fetchHardwareInfo();
    res.end(JSON.stringify(hardwareInfo));
  } else {
    res.end('Invalid request');
  }
}).listen(3000, () => {
  console.log('Server running on port 3000');
});
