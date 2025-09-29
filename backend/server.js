const express = require('express');
const path = require('path');
const csv = require('csvtojson');
const cors = require('cors');  // Import the CORS middleware

const app = express();

// Enable CORS for all routes
app.use(cors());

// Serve static files from C:/GLOFMAPS under the /static route
app.use('/static', express.static('C:/GLOFMAPS'));

// Endpoint to get glacier data from the CSV file
app.get('/glacier-data', async (req, res) => {
    const csvFilePath = path.resolve(__dirname, 'Manual_Glacier_Dataset_India.csv');
    try {
        const jsonArray = await csv().fromFile(csvFilePath);
        res.json(jsonArray);  // Send glacier data as JSON response
    } catch (err) {
        console.error('Error reading CSV file:', err);  // Log the error for debugging
        res.status(500).json({ error: 'Failed to read the dataset' });
    }
});

// Start the server
const PORT = process.env.PORT || 3777;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
