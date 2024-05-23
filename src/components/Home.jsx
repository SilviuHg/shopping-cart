import { useOutletContext } from "react-router-dom";

const Home = () => {
  const [products] = useOutletContext();
  let homeProducts = products.slice(0, 3);

  if (products.length === 0) return <p>Loading...</p>;

  return (
    <div className="home">
      <div className="description">
        <h2>Welcome to my market!</h2>
        <h3>Home of lorem ipsum products</h3>
        <p>Lorem ipsum dolor sit amet</p>
      </div>
      <ul>
        {homeProducts.map((item) => (
          <li className="item-card" key={item.id}>
            <img src={item.image} />
            <p>{item.title}</p>
            <p>${item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
