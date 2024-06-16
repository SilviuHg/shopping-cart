import { useOutletContext, Link } from "react-router-dom";

const Home = () => {
  const [products] = useOutletContext();
  let homeProducts = products.slice(0, 3);

  if (products.length === 0) return <p>Loading...</p>;

  return (
    <div className="home">
      <div className="description">
        <h1>Welcome to my market!</h1>
        <h3>Home of lorem ipsum products</h3>
        <p>Lorem ipsum dolor sit amet</p>
      </div>
      <ul>
        {homeProducts.map((item) => (
          <Link to={`/product/${item.id}`} key={item.id}>
            <li className="item-card">
              <img src={item.image} />
              <p className="title">{item.title}</p>
              <p className="price-stock">${item.price}</p>
              <p className="rating-qty">{`Rating: ${item.rating.rate} (${item.rating.count})`}</p>
            </li>
          </Link>
        ))}
      </ul>
      <Link to="/shop">
        <button className="shop-now-btn">Shop now</button>
      </Link>
    </div>
  );
};

export default Home;
