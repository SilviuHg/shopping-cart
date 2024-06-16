import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import BackBtnIcon from "../assets/arrow_back.svg";

const Product = () => {
  const [products, handleAddCartItems, , cart] = useOutletContext();
  const [quantity, setQuantity] = useState(1);
  const productData = useParams();
  const navigate = useNavigate();
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
      <button
        className="back-btn"
        onClick={() => {
          navigate(-1);
        }}
      >
        <img src={BackBtnIcon} />
      </button>
      <div className="product-info">
        <div className="left-side">
          <img src={productDisplayed.image} alt={productDisplayed.title} />
        </div>
        <div className="right-side">
          <h2>{productDisplayed.title}</h2>
          <p className="price-stock">In stock</p>
          <h3>${productDisplayed.price}</h3>
          <div className="qty-container">
            <button className="qty-button" onClick={handleDecrement}>
              -
            </button>
            <p>{quantity}</p>
            <button className="qty-button" onClick={handleIncrement}>
              +
            </button>
          </div>
          <p className="product-description">{productDisplayed.description}</p>
          <button
            className="add-to-cart-btn"
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
