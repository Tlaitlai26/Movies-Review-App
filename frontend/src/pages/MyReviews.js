import { useEffect, useState } from 'react';
import { reviews } from '../services/api';
import { Link } from 'react-router-dom';

function MyReviews() {
  const [myReviews, setMyReviews] = useState([]);
  const userId = "user123";

  useEffect(() => {
    // In real app: fetch all reviews, filter by userId
    // For demo: fetch all and filter
    reviews.getAll().then(res => setMyReviews(res.data.filter(r => r.userId === userId)));
  }, []);

  return (
    <div>
      <h2>My Reviews</h2>
      {myReviews.length === 0 ? (
        <p>You haven't reviewed any movies yet.</p>
      ) : (
        myReviews.map(r => (
          <div key={r.id} className="border p-3 mb-3">
            <Link to={`/movie/${r.movieId}`}><strong>Movie ID: {r.movieId}</strong></Link>
            <p>{r.rating} stars - {r.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyReviews;