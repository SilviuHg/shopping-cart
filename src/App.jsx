import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  function handleAddCartItems(item) {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id); // check if current item is in the cart
      if (existingItem) {
        return prevCart.map(
          (cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 } // if current item exists, update quantity
              : cartItem // return other items unchanged
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  }

  function handleDeleteCartItems(item) {
    const updatedArray = cart.filter((element) => element.id != item.id);
    setCart(updatedArray);
  }

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
          <Link to="/">
            <button>Home</button>
          </Link>

          <Link to="shop">
            <button>Shop</button>
          </Link>

          <Link to="cart">
            <button>Cart {cart.length}</button>
          </Link>
        </div>
      </nav>
      <Outlet
        context={[products, handleAddCartItems, handleDeleteCartItems, cart]}
      />
    </>
  );
}

export default App;
