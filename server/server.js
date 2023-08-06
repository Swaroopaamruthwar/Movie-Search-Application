const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const apiKey = '9675b96b088b82db663df421102f3200';

app.get('/api/search', async (req, res) => {
    const { query, page } = req.query;

    try {
        if (!query) {
            return res.status(400).json({ error: 'Please provide a valid search query.' });
        }

        const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page || 1}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.results.length === 0) {
            return res.status(404).json({ error: 'No movies found for the given search query.' });
        }

        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
