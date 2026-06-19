const express = require('express');
const cors = require('cors');
const axios = require('axios');
const data = require('./data');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is working');
});

app.post('/search', (req, res) => {

    const { keyword } = req.body;

    if (!keyword) {
        return res.status(400).json({
            error: 'Keyword is required'
        });
    }

    const urls = data[keyword.toLowerCase()] || [];

    res.json({ urls });
});

app.post('/download', async (req, res) => {

    const { url } = req.body;

    try {

        const response = await axios.get(url);

        res.json({
            content: response.data,
            size: JSON.stringify(response.data).length
        });

    } catch (error) {

        res.status(500).json({
            error: 'Download failed'
        });

    }

});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});