import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Root() {
  return (
    <div className="flex flex-col bg-base-primary w-screen min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Root;
