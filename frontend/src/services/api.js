import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const omdb = {
  searchMovies: (query = 'batman') => 
    axios.get(`${API_URL}/api/search?s=${query}`),
  getMovie: (imdbId) => 
    axios.get(`${API_URL}/api/movie/${imdbId}`)
};

export const reviews = {
  getAll: () => axios.get(`${API_URL}/reviews`),
  getByMovie: (movieId) => axios.get(`${API_URL}/reviews/${movieId}`),
  create: (data) => axios.post(`${API_URL}/reviews`, data),
  update: (id, data) => axios.put(`${API_URL}/reviews/${id}`, data),
  cremove: (id) => axios.delete(`${API_URL}/reviews/${id}`)
};
