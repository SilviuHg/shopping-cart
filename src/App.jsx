import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShopItems = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products", {
          mode: "cors",
        });
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let shopItems = await response.json();
        console.log(shopItems);
        setProducts(shopItems);
        setError(null);
      } catch (err) {
        setError(err);
        setProducts([]);
      }
    };

    fetchShopItems();
  }, []);

  if (error) return <p>A network error was encountered: {error.message}</p>;

  return (
    <>
      <nav className="nav">
        <div className="logo">
          <p>Logo</p>
        </div>
        <div className="nav-buttons">
          <button>
            <Link to="/">Home</Link>
          </button>
          <button>
            <Link to="shop">Shop</Link>
          </button>
          <button>
            <Link to="cart">Cart</Link>
          </button>
        </div>
      </nav>
      <Outlet context={[products]} />
    </>
  );
}

export default App;
