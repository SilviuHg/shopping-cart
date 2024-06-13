import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import CartIcon from "../src/assets/shopping_cart.svg";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  function handleAddCartItems(item, quantity) {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id); // check if current item is in the cart
      if (existingItem) {
        return prevCart.map(
          (cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + quantity } // if current item exists, update quantity
              : cartItem // return other items unchanged
        );
      } else {
        return [...prevCart, { ...item, quantity: quantity }];
      }
    });
  }

  function handleDeleteCartItems(item) {
    const updatedArray = cart.filter((cartItem) => cartItem.id != item.id);
    setCart(updatedArray);
  }

  function handleIncrementQuantity(item) {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  }

  function handleDecrementQuantity(item) {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === item.id && cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
    );
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
          <Link to="/">
            <h1>market.</h1>
          </Link>
        </div>
        <div className="nav-buttons">
          <Link to="/" className="link-style">
            <button className="nav-btn">Home</button>
          </Link>

          <Link to="shop" className="link-style">
            <button className="nav-btn">Shop</button>
          </Link>

          <Link to="cart" className="link-style">
            <button className="nav-btn">
              Cart <img src={CartIcon} />
              {cart.length}
            </button>
          </Link>
        </div>
      </nav>
      <Outlet
        context={[
          products,
          handleAddCartItems,
          handleDeleteCartItems,
          cart,
          handleIncrementQuantity,
          handleDecrementQuantity,
        ]}
      />
    </>
  );
}

export default App;
