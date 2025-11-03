const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// === OMDb PROXY ENDPOINTS (MOCKED FOR DEMO) ===

app.get('/api/search', (req, res) => {
  const { s = 'batman' } = req.query;
  // Mock response for demo purposes
  const mockMovies = [
    {
      Title: "Batman Begins",
      Year: "2005",
      imdbID: "tt0372784",
      Type: "movie",
      Poster: "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg0YjEtMDQyYzNmYzBEY2RlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },
    {
      Title: "The Dark Knight",
      Year: "2008",
      imdbID: "tt0468569",
      Type: "movie",
      Poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg"
    },
    {
      Title: "Batman v Superman: Dawn of Justice",
      Year: "2016",
      imdbID: "tt2975590",
      Type: "movie",
      Poster: "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },
    {
      Title: "The Batman",
      Year: "2022",
      imdbID: "tt1877830",
      Type: "movie",
      Poster: "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_SX300.jpg"
    }
  ];
  res.json({ Search: mockMovies, totalResults: "4", Response: "True" });
});

app.get('/api/movie/:imdbID', (req, res) => {
  const { imdbID } = req.params;
  // Mock detailed movie data
  const mockMovieDetails = {
    Title: "Batman Begins",
    Year: "2005",
    Rated: "PG-13",
    Released: "15 Jun 2005",
    Runtime: "140 min",
    Genre: "Action, Adventure, Crime",
    Director: "Christopher Nolan",
    Writer: "Bob Kane, David S. Goyer, Christopher Nolan",
    Actors: "Christian Bale, Michael Caine, Liam Neeson",
    Plot: "After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.",
    Language: "English, Mandarin",
    Country: "United States, United Kingdom",
    Awards: "Nominated for 1 Oscar. 14 wins & 79 nominations total",
    Poster: "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg0YjEtMDQyYzNmYzBEY2RlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    Ratings: [
      { Source: "Internet Movie Database", Value: "8.2/10" },
      { Source: "Rotten Tomatoes", Value: "84%" },
      { Source: "Metacritic", Value: "70/100" }
    ],
    Metascore: "70",
    imdbRating: "8.2",
    imdbVotes: "1,439,000",
    imdbID: "tt0372784",
    Type: "movie",
    DVD: "18 Oct 2005",
    BoxOffice: "$206,863,479",
    Production: "N/A",
    Website: "N/A",
    Response: "True"
  };
  res.json(mockMovieDetails);
});

// === REVIEW ENDPOINTS ===
app.get('/reviews', async (req, res) => {
  const snapshot = await db.collection('reviews').get();
  const reviews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(reviews);
});

app.get('/reviews/:movieId', async (req, res) => {
  const snapshot = await db.collection('reviews')
    .where('movieId', '==', req.params.movieId)
    .get();
  const reviews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(reviews);
});

app.post('/reviews', async (req, res) => {
  const docRef = await db.collection('reviews').add(req.body);
  res.json({ id: docRef.id, ...req.body });
});

app.put('/reviews/:id', async (req, res) => {
  await db.collection('reviews').doc(req.params.id).update(req.body);
  res.json({ success: true });
});

app.delete('/reviews/:id', async (req, res) => {
  await db.collection('reviews').doc(req.params.id).delete();
  res.json({ success: true });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));