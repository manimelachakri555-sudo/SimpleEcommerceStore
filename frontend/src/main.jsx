import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

import CartProvider from "./context/CartContext";
//import WishlistProvider from "./context/WishlistContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      
        <App />
    
    </CartProvider>
  </React.StrictMode>
);