import App from "./App.jsx";
import Shop from "./components/Shop.jsx";
import Home from "./components/Home.jsx";
import Product from "./components/Product.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Shop /> },
      { path: "product/:productId", element: <Product /> },
    ],
  },
];

export default routes;
