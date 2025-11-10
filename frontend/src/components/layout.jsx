import Footer from "@components/footer";
import Header from "@components/header";
import CartSidebar from "@components/CartSidebar";
import Sponsors from "@components/Sponsors";
import { Outlet } from "react-router-dom";

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
