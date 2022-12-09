import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar bg-primary text-primary-content sticky top-0 z-50">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost normal-case text-xl font-black">
          Toronto Fitness Club
        </Link>
      </div>
      <div className="navbar-end">
        <div className="tooltip tooltip-left" data-tip="Find Studios">
          <Link to="/studios" className="btn btn-ghost btn-circle">
            <MagnifyingGlassIcon className="w-5 h-5" />
          </Link>
        </div>
        <div className="tooltip tooltip-left" data-tip="My Account">
          <Link to="/account" className="btn btn-ghost btn-circle">
            <UserCircleIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
