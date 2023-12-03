const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const axios = require('axios');
const fs = require('fs');

const app = express();
const PORT = 3000;
const DATA_FILE = 'player_counts.json';

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

// In-memory storage for player counts and timestamps
let playerCounts = [];

// Load previous counts from JSON file on startup
if (fs.existsSync(DATA_FILE)) {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        playerCounts = JSON.parse(data);
        if (!Array.isArray(playerCounts)) {
            throw new Error('Invalid data in player_counts.json');
        }
    } catch (error) {
        console.error('Error parsing player_counts.json:', error.message);
        // Initialize with an empty array if parsing fails
        playerCounts = [];
    }
}

// Fetch initial player count and store in JSON file
(async () => {
    try {
        const initialPlayerCount = await getTF2PlayerCount();
        const initialTimestamp = new Date().toISOString();
        playerCounts.push({ count: initialPlayerCount, timestamp: initialTimestamp });
        fs.writeFileSync(DATA_FILE, JSON.stringify(playerCounts), 'utf8');
        console.log(`Initial player count recorded at ${initialTimestamp}: ${initialPlayerCount}`);
    } catch (error) {
        console.error('Failed to fetch initial player count:', error.message);
    }

    // Start periodic updates after initializing
    startPeriodicUpdates();
})();

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
 *             example: {"playerCounts": [{"count": 50000, "timestamp": "2023-12-05T15:30:00"}, {"count": 51000, "timestamp": "2023-12-05T15:31:00"}]}
 */
app.get('/api/player-counts', (req, res) => {
    res.json({ playerCounts });
});

// Periodically update player counts in memory
// If over 10, remove the oldest player count
function startPeriodicUpdates() {
    setInterval(async () => {
        try {
            const playerCount = await getTF2PlayerCount();
            const timestamp = new Date().toISOString();
            playerCounts.push({ count: playerCount, timestamp });
            if (playerCounts.length > 10) {
                playerCounts.shift();
            }
            console.log(`Player count updated at ${timestamp}: ${playerCount}`);

            // Save current counts to JSON file
            fs.writeFileSync(DATA_FILE, JSON.stringify(playerCounts), 'utf8');
        } catch (error) {
            console.error('Failed to update player counts:', error.message);
        }
    }, 600000); // Update every 10 minutes
}

// Get TF2 player count from Steam API
async function getTF2PlayerCount() {
    try {
        const response = await axios.get('https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=440');
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