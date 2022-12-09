import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Root() {
  return (
    <div className="bg-primary">
      <div className="min-h-screen">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Root;
