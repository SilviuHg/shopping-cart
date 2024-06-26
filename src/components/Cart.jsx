import { useOutletContext, Link } from "react-router-dom";
import DeleteIcon from "../assets/delete_icon.svg";

const Cart = () => {
  const [
    ,
    ,
    handleDeleteCartItems,
    cart,
    handleIncrementQuantity,
    handleDecrementQuantity,
  ] = useOutletContext();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartItems = cart.reduce((total, item) => total + item.quantity, 0);

  if (cart.length === 0)
    return (
      <>
        <div className="cart-placeholder">
          <h2>Your shopping cart</h2>
          <p>Your cart is empty</p>
          <p>Fill it with your favorite pieces</p>
          <Link to="/shop">
            <button className="shop-now-btn">Shop now</button>
          </Link>
        </div>
      </>
    );
  console.log(cart);

  return (
    <div className="cart">
      <h2>Your shopping cart</h2>
      <div className="cart-container">
        <div className="cart-list">
          {cart.map((product) => (
            <div className="list-item" key={product.id}>
              <img src={product.image} alt={product.title} />
              <div className="item-info">
                <h3>{product.title}</h3>
                <p className="price-stock">In stock</p>
                <p className="rating-qty">Qty: {product.quantity}</p>
              </div>
              <div className="qty-buttons">
                <button
                  className="qty-button"
                  onClick={() => handleDecrementQuantity(product)}
                >
                  -
                </button>
                <p>{product.quantity}</p>
                <button
                  className="qty-button"
                  onClick={() => handleIncrementQuantity(product)}
                >
                  +
                </button>
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDeleteCartItems(product)}
              >
                <img src={DeleteIcon} alt={`Delete ${product.title}`} />
              </button>
              <h3>${(product.price * product.quantity).toFixed(2)}</h3>
            </div>
          ))}
        </div>
        <div className="checkout">
          <h2>Order summary</h2>
          <h3>${totalPrice.toFixed(2)}</h3>
          <div className="subtotal">
            <p>Subtotal ({cartItems} items)</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
          <div className="transport">
            <p>Shipping cost</p>
            <p>$ 0</p>
          </div>
          <hr />
          <div className="total">
            <h3>Total</h3>
            <h3>${totalPrice.toFixed(2)}</h3>
          </div>
          <button
            onClick={() =>
              alert(
                "Congratulations! You would have made a successful purchase if this was a real store."
              )
            }
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
