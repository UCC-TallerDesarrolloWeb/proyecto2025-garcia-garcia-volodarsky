import Footer from "./footer";
import Header from "./header"
import CartSidebar from "./CartSidebar"
import Sponsors from "./Sponsors"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
        <Sponsors />
      </main>
      <Footer />
      <CartSidebar />
    </>
  );
};

export default Layout;
