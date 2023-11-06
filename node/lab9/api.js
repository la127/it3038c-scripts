const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

const widgetsData = JSON.parse(fs.readFileSync('widgets.json'));

app.get('/', (req, res) => {
  res.writeHead(200, { "Content-Type": "text/json" });
  res.end(JSON.stringify(widgetsData));
});

app.get('/blue', (req, res) => {
  const blueWidgets = widgetsData.filter(widget => widget.color === 'blue');
  res.json(blueWidgets);
});

app.get('/widgets/:id', (req, res) => {
  const widgetId = req.params.id;
  const widget = widgetsData.find(widget => widget.id === parseInt(widgetId));

  if (widget) {
    res.json(widget);
  } else {
    res.status(404).json({ message: 'Widget not found' });
  }
});

app.use((req, res) => {
  res.status(404).send('Data not found');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

