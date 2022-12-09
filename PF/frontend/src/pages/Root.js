import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Root() {
  return (
    <div className="bg-base-200 min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Root;
