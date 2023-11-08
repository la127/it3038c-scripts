const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

const widgetsData = JSON.parse(fs.readFileSync('./widgets.json').toString());

// Add ID field to the widgets data
widgetsData.forEach((widget, index) => {
    widget.id = index + 1; // Assigning IDs starting from 1
});

app.get('/', (req, res) => {
    res.status(200).json(widgetsData);
});

app.get('/blue', (req, res) => {
    const blueWidgets = widgetsData.filter(widget => widget.color === 'blue');
    res.status(200).json(blueWidgets);
});

app.get('/widgets/:id', (req, res) => {
    const widgetId = req.params.id;
    const widget = widgetsData.find(widget => widget.id === parseInt(widgetId));

    if (widget) {
        res.status(200).json(widget);
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