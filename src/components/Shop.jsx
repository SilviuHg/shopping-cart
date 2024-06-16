import { useOutletContext, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Shop = () => {
  const [products] = useOutletContext();
  const [displayedProducts, setDisplayedProducts] = useState([]);

  function handleFilter(category) {
    if (category == "all") {
      setDisplayedProducts(products);
    } else {
      const filteredItems = products.filter(
        (item) => item.category == category
      );
      setDisplayedProducts(filteredItems);
    }
  }

  useEffect(() => {
    setDisplayedProducts(products);
  }, [products]);

  if (products.length === 0) return <p>Loading...</p>;
  return (
    <div className="shop">
      <div className="sidebar">
        <button value="all" onClick={(e) => handleFilter(e.target.value)}>
          All
        </button>
        <button
          value="men's clothing"
          onClick={(e) => handleFilter(e.target.value)}
        >
          Men&apos;s clothing
        </button>
        <button
          value="women's clothing"
          onClick={(e) => handleFilter(e.target.value)}
        >
          Women&apos;s clothing
        </button>
        <button value="jewelery" onClick={(e) => handleFilter(e.target.value)}>
          Jewelry
        </button>
        <button
          value="electronics"
          onClick={(e) => handleFilter(e.target.value)}
        >
          Electronics
        </button>
      </div>
      <div className="items">
        {displayedProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <div className="item-card">
              <img src={product.image} alt={product.title} />
              <p className="title">{product.title}</p>
              <p className="price-stock">${product.price}</p>
              <p className="rating-qty">{`Rating: ${product.rating.rate} (${product.rating.count})`}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Shop;
