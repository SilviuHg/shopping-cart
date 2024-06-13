import App from "./App.jsx";
import Shop from "./components/Shop.jsx";
import Home from "./components/Home.jsx";
import Product from "./components/Product.jsx";
import Cart from "./components/Cart.jsx";
import ErrorPage from "./components/ErrorPage.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
      { path: "product/:productId", element: <Product /> },
    ],
  },
];

export default routes;
