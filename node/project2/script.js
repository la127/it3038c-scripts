const http = require('http');
const si = require('systeminformation');
const opn = require('opn');

async function fetchHardwareInfo() {
  try {
    const cpuData = await si.cpu();
    const memData = await si.mem();
    const diskData = await si.diskLayout();
    const batteryData = await si.battery();
    const graphicsData = await si.graphics();
    const osData = await si.osInfo();
    const networkData = await si.networkInterfaces();

    const hardwareInfo = {
      cpu: cpuData.manufacturer,
      memory: memData.manufacturer,
      disks: diskData.map(disk => disk.name),
      battery: batteryData[0] ? batteryData[0].model : 'N/A',
      graphics: graphicsData.controllers.map(controller => controller.model),
      os: osData.distro,
      network: networkData.map(interface => interface.iface)
    };

    return hardwareInfo;
  } catch (error) {
    console.error('Error fetching hardware information:', error);
    return { error: 'Failed to fetch hardware information' };
  }
}

http.createServer(async (req, res) => {
  if (req.url === '/hardware-info') {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    try {
      const hardwareInfo = await fetchHardwareInfo();
      const hardwareNames = Object.values(hardwareInfo).flat().filter(Boolean);

      const htmlResponse = `
        <html>
        <head>
          <title>Hardware Info</title>
          <style>
            html, body {
              height: 100%;
            }
            body {
              margin: 0;
              padding: 20px;
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              align-content: flex-start;
              gap: 5px;
              background: linear-gradient(to bottom right, purple, cyan);
              color: white;
              font-family: Arial, sans-serif;
              font-size: 2em;
            }
            .name {
              text-shadow: 2px 2px 2px black;
            }
            @media (max-width: 600px) {
              .name {
                font-size: 1.5em;
              }
            }
          </style>
        </head>
        <body>
          ${hardwareNames.map(name => `<span class="name">${name}</span>`).join('')}
        </body>
        </html>
      `;

      res.end(htmlResponse);
    } catch (error) {
      res.end('<p>Error fetching hardware information</p>');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>Invalid request</h1>');
  }
}).listen(3000, async () => {
  console.log('Server running on port 3000');

  try {
    await opn('http://localhost:3000/hardware-info');
  } catch (error) {
    console.error('Error opening the browser:', error);
  }
});
