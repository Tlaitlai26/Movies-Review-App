// src/components/Navbar.js
import { Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

function NavBar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">MovieReview</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          {currentUser && (
            <>
              <Nav.Link as={Link} to="/movies">Browse</Nav.Link>
              <Nav.Link as={Link} to="/my-reviews">My Reviews</Nav.Link>
            </>
          )}
        </Nav>
        <Nav>
          {currentUser ? (
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          ) : (
           <Nav.Link as={Link} to="/login">Login</Nav.Link>,
          <Nav.Link as={Link} to="/register">Register</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;