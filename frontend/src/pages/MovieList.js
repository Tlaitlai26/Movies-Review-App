import { useEffect, useState } from 'react';
import { omdb } from '../services/api';
import { Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    omdb.searchMovies('batman').then(res => {
      if (res.data.Search) {
        setMovies(res.data.Search);
      } else {
        setError('No movies found.');
      }
      setLoading(false);
    }).catch(err => {
      setError('Failed to load movies.');
      setLoading(false);
    });
  }, []);

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="warning" className="text-center">{error}</Alert>;

  return (
    <>
      <h2>Popular Movies</h2>
      <p className="text-muted">Search results for: <strong>Batman</strong></p>
      <Row>
        {movies.map(movie => (
          <Col md={4} key={movie.imdbID} className="mb-4">
            <Card className="h-100 shadow-sm">
              {/* FIXED: Show real poster or fallback */}
              <Card.Img
                variant="top"
                src={movie.Poster && movie.Poster !== 'N/A' 
                  ? movie.Poster 
                  : 'https://via.placeholder.com/300x450?text=No+Poster'}
                alt={movie.Title}
                style={{ height: '450px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster';
                }}
              />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Year}</Card.Text>
                <Link to={`/movie/${movie.imdbID}`} className="btn btn-primary w-100">
                  View & Review
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default MovieList;