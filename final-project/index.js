const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Swagger Options
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TF2 Player Counts API',
            version: '1.0.0',
            description: 'API for retrieving Team Fortress 2 player counts.',
        },
    },
    apis: ['index.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// In-memory storage for player counts
let playerCounts = [];

// Sample endpoint to get player counts
/**
 * @swagger
 * /api/player-counts:
 *   get:
 *     summary: Get TF2 player counts
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"playerCounts": [50000, 51000, 52000]}
 */
app.get('/api/player-counts', (req, res) => {
    res.json({ playerCounts });
});

// Periodically update player counts in memory
// If over 10, remove the oldest player count
setInterval(async () => {
    try {
        const playerCount = await getTF2PlayerCount();
        playerCounts.push(playerCount);
        if (playerCounts.length > 10) {
            playerCounts.shift();
        }
    } catch (error) {
        console.error('Failed to update player counts:', error.message);
    }
}, 60000); // Update every 60 seconds

// Get TF2 player count from Steam API
async function getTF2PlayerCount() {
    try {
        const response = await axios.get(`https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=440'`);
        const playerCount = response.data.response.player_count;
        return playerCount;
    } catch (error) {
        console.error('Failed to fetch TF2 player count:', error.message);
        throw error;
    }
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});