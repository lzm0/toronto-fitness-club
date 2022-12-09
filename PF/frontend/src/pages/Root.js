import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Root() {
  return (
    <div className="bg-primary">
      <ScrollRestoration />
      <div className="">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Root;
