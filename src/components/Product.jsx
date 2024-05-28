import { useOutletContext, useParams } from "react-router-dom";
import { useState } from "react";

const Product = () => {
  const [products, handleAddCartItems, , cart] = useOutletContext();
  const [quantity, setQuantity] = useState(1);
  const productData = useParams();
  const productDisplayed = products.find(
    (product) => product.id == productData.productId
  );

  function handleIncrement() {
    setQuantity((quantity) => quantity + 1);
  }

  function handleDecrement() {
    if (quantity == 1) return;
    setQuantity((quantity) => quantity - 1);
  }

  console.log(productData, products, productDisplayed, cart);

  if (products.length === 0) return <p>Loading...</p>;

  return (
    <div className="product-page">
      <div className="product-info">
        <div className="left-side">
          <img src={productDisplayed.image} />
        </div>
        <div className="right-side">
          <h2>{productDisplayed.title}</h2>
          <div className="qty-container">
            <button onClick={handleDecrement}>-</button>
            <p>{quantity}</p>
            <button onClick={handleIncrement}>+</button>
          </div>
          <h3>${productDisplayed.price}</h3>
          <p>{productDisplayed.description}</p>
          <button
            onClick={() => handleAddCartItems(productDisplayed, quantity)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
