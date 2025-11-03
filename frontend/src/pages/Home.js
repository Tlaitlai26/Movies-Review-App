import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="text-center mt-5">
      <h1>Welcome to Movie Review</h1>
      <p>Rate, review, and discover movies!</p>
      <Link to="/movies" className="btn btn-primary btn-lg">
        Browse Movies
      </Link>
    </div>
  );
}

export default Home;
