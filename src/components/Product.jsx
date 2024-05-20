import { useOutletContext, useParams } from "react-router-dom";

const Product = () => {
  const [products] = useOutletContext();
  const { name } = useParams();
  return (
    <div className="product-page">
      <div className="product-info">
        <div className="left-side">
          <img src={products[name].image} />
        </div>
        <div className="right-side">
          <h1>{products[name].title}</h1>
          <h3>{products[name].price}</h3>
        </div>
      </div>
    </div>
  );
};

export default Product;
