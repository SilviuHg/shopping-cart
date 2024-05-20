import { useOutletContext, Link } from "react-router-dom";

const Shop = () => {
  const [products] = useOutletContext();

  return (
    <div className="shop">
      <div className="sidebar">filter products</div>
      <div className="items">
        {products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <div className="item-card">
              <img src={product.image} />
              <p>{product.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Shop;
