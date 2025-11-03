import { useParams } from 'react-router-dom';  // ← FIXED
import { useEffect, useState } from 'react';
import { omdb, reviews } from '../services/api';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';

function MovieDetail() {
  const { id } = useParams();  // ← Now works
  const [movie, setMovie] = useState(null);
  const [reviewsList, setReviewsList] = useState([]);

  const loadReviews = () => {
    reviews.getByMovie(id).then(res => {
      setReviewsList(res.data);
    }).catch(err => {
      console.error('Failed to load reviews:', err);
    });
  };

  useEffect(() => {
    omdb.getMovie(id).then(res => {
      setMovie(res.data);
    }).catch(err => {
      console.error(err);
      setMovie({ Error: 'Failed to load movie' });
    });
  }, [id]);

  useEffect(() => {
    loadReviews();
  }, [id]);

  if (!movie) return <div className="text-center mt-5"><h3>Loading...</h3></div>;
  if (movie.Error) return <div className="text-center mt-5"><h3>{movie.Error}</h3></div>;

  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-4">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
            alt={movie.Title}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-8">
          <h2>{movie.Title}</h2>
          <p className="lead">
            <strong>Year:</strong> {movie.Year} |
            <strong> IMDb:</strong> {movie.imdbRating}/10
          </p>
          <p>{movie.Plot}</p>
        </div>
      </div>
      <hr />
      <ReviewForm movieId={id} onReviewAdded={loadReviews} />
      <ReviewList movieId={id} reviews={reviewsList} loadReviews={loadReviews} />
    </div>
  );
}

export default MovieDetail;