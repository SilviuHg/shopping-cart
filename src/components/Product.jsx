import { useOutletContext, useParams } from "react-router-dom";

const Product = () => {
  const [products, handleAddCartItems] = useOutletContext();
  const productData = useParams();
  const productDisplayed = products.find(
    (product) => product.id == productData.productId
  );
  console.log(productData, products, productDisplayed);

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
            <button>-</button>
            <p>1</p>
            <button>+</button>
          </div>
          <h3>${productDisplayed.price}</h3>
          <p>{productDisplayed.description}</p>
          <button onClick={() => handleAddCartItems(productDisplayed)}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
