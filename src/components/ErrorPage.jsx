import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1>Oooops</h1>
      <h2>404 - Page Not Found</h2>
      <Link to="/">
        <div className="error-link">You can go back home by clicking here!</div>
      </Link>
    </div>
  );
};

export default ErrorPage;
