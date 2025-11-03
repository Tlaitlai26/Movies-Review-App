// src/pages/Register.js
import { useState } from "react";
import { useAuth } from "../context/Authcontext";
import { useNavigate, Link } from "react-router-dom";
import { Alert, Button, Card, Form } from "react-bootstrap";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // We'll use login after creating user
  const navigate = useNavigate();

  // Firebase Auth: create user
  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    try {
      setError("");
      setLoading(true);

      // Create user in Firebase Auth
      const { createUserWithEmailAndPassword } = await import("firebase/auth");
      const { auth } = await import("../firebase");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Auto-login
      await login(email, password);

      // Redirect to main app
      navigate("/movies");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email already registered. Try logging in.");
      } else if (err.code === "auth/weak-password") {
        setError("Password too weak.");
      } else {
        setError("Failed to create account. Try again.");
      }
    }
    setLoading(false);
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card style={{ width: "22rem" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Create Account</Card.Title>
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
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100 mb-2">
              Sign Up
            </Button>
          </Form>
          <div className="text-center">
            <small>
              Already have an account? <Link to="/login">Log In</Link>
            </small>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Register;