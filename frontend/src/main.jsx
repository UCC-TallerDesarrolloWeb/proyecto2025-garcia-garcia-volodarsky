import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@styles/main.scss";
import Shop from "@pages/shop";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@components/layout";
import Home from "@pages/home";
import Cart from "@pages/cart";
import Calendario from "@pages/calendario";
import Roster from "@pages/roster";
import Historia from "@pages/historia";
import Nosotros from "@pages/nosotros";
import Checkout from "@pages/checkout";
import { CartProvider } from "@components/CartContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/roster" element={<Roster />} />
            <Route path="/historia" element={<Historia />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
