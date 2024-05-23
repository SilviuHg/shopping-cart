import { useOutletContext } from "react-router-dom";

const Cart = () => {
  const [, , handleDeleteCartItems, cart] = useOutletContext();

  if (cart.length === 0)
    return (
      <>
        <h1>Your shopping cart</h1>
        <p>Your cart is empty</p>
        <p>Fill it with your favorite pieces</p>
        <button>Shop now</button>
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
              <img src={product.image} />
              <div className="item-info">
                <h3>{product.title}</h3>
                <p>In stock</p>
                <p>Qty:</p>
              </div>
              <div className="qty-buttons">
                <p>Qty buttons</p>
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDeleteCartItems(product)}
              >
                Delete item
              </button>
              <h3>${product.price}</h3>
            </div>
          ))}
        </div>
        <div className="checkout">
          <h2>Order summary</h2>
          <h3>Total price</h3>
          <div className="subtotal">
            <p>Subtotal</p>
            <p>price</p>
          </div>
          <div className="transport">
            <p>Shipping cost</p>
            <p>$ 0</p>
          </div>
          <hr></hr>
          <div className="total">
            <h3>Total</h3>
            <h3>Total price</h3>
          </div>
          <button>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
