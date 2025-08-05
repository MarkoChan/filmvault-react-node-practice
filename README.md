# Film Vault

A simple React website that uses the [TMDb API](https://www.themoviedb.org/documentation/api) to search and display movie information. Built with [Vite](https://vitejs.dev/) for fast development and hot module replacement.

## Features

- Search for movies using the TMDb API
- View movie posters, titles, and overviews
- Built using React (frontend) + Express (backend)
- Responsive UI

## Attribution

This product uses the TMDb API but is not endorsed or certified by TMDb.  
Movie data and images © [TMDb](https://www.themoviedb.org/).

## Getting Started

```bash
git clone https://github.com/MarkoChan/filmvault-react-node-practice.git
cd filmvault-react-node-practice

cd filmvault-frontend
npm install
npm run dev

cd ../filmvault-backend
# Create a .env file and add your TMDb API key
echo "TMDB_API_KEY=your_api_key_here" > .env

npm install
node server.js
