const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

// set env var
dotenv.config();

// setup
const app = express();
app.use(cors());

// setup API key and URL
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

// search function
app.get('/api/search', async (req, res) => {
    // get query
    const query = req.query.q;
    const page = req.query.page || 1;

    try {
        // call tmdb api
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
            params: {
                api_key: TMDB_API_KEY,
                query,
                page
            },
        });

        // send data back
        res.json(response.data);
    } catch (error) {
        // send back error
        console.error('TMDb request failed:', error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
})

// popular movies function
app.get("/api/popular", async (req, res) => {
    try {
        const page = req.query.page || 1;
        // call tmdb api
        const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
            params: {
                api_key: TMDB_API_KEY,
                page
            },
        });

        res.json(response.data);
    } catch (error) {
        // send back error
        console.error('TMDb request failed:', error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
})


app.listen(5000, () => {
    console.log("Server started on port 5000")
})