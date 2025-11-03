import { useState } from 'react';
import { reviews } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Alert, Button, Card } from 'react-bootstrap';

function ReviewList({ movieId, reviews: reviewList, loadReviews }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const { currentUser } = useAuth();

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this review?')) return;
    await reviews.remove(id);
    loadReviews();
  };

  const startEdit = (review) => {
    setEditingId(review.id);
    setEditText(review.text);
  };

  const saveEdit = async () => {
    await reviews.update(editingId, { text: editText });
    setEditingId(null);
    loadReviews();
  };

  return (
    <div className="mt-4">
      <h4>Reviews ({reviewList.length})</h4>
      {reviewList.length === 0 ? (
        <Alert variant="info">No reviews yet. Be the first!</Alert>
      ) : (
        reviewList.map(review => (
          <Card key={review.id} className="mb-3">
            <Card.Body>
              {editingId === review.id ? (
                <>
                  <textarea
                    className="form-control mb-2"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows="3"
                  />
                  <Button size="sm" onClick={saveEdit}>Save</Button>{' '}
                  <Button size="sm" variant="secondary" onClick={() => setEditingId(null)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <p className="mb-2"><strong>{review.userEmail}</strong></p>
                  <p>{review.text}</p>
                  <small className="text-muted">
                    {new Date(review.timestamp).toLocaleString()}
                  </small>
                  {currentUser && currentUser.email === review.userEmail && (
                    <div className="mt-2">
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() => startEdit(review)}
                      >
                        Edit
                      </Button>{' '}
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleDelete(review.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}

export default ReviewList;