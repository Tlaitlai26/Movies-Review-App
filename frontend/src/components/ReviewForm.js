import { useState } from 'react';
import { reviews } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Button, Form } from 'react-bootstrap';

function ReviewForm({ movieId, onReviewAdded }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    await reviews.create({
      movieId,
      text,
      userEmail: currentUser.email,
      timestamp: new Date().toISOString()
    });
    setText('');
    setLoading(false);
    onReviewAdded?.();
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-4">
      <h5>Add Your Review</h5>
      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Write your review..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit" disabled={loading}>
        {loading ? 'Posting...' : 'Post Review'}
      </Button>
    </Form>
  );
}

export default ReviewForm;