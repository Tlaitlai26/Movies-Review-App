// src/pages/Login.js
import { useState } from "react";
import { useAuth } from "../context/Authcontext";
import { useNavigate, Link } from "react-router-dom";
import { Alert, Button, Card, Form } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/movies");  // ← REDIRECT TO MAIN APP
    } catch (err) {
      setError("Failed to log in. Check email/password.");
    }
    setLoading(false);
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card style={{ width: "22rem" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Movie Review Login</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100">
              Log In
            </Button>
          </Form>
          <div className="text-center mt-3">
            <small>Test: test@example.com / 123456</small>
          </div>
          <div className="text-center mt-3">
          <small>
            Don't have an account? <Link to="/register">Sign Up</Link>
           </small>
           </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;