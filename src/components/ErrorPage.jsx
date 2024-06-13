import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <h1>Oooops</h1>
      <div>
        <h2>404 - Page Not Found</h2>
        <Link to="/">
          <div>You can go back home by clicking here!</div>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
