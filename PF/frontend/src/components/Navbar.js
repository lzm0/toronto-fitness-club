import {
  GlobeAmericasIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar bg-primary text-primary-content sticky top-0 z-50">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost normal-case text-xl font-black">
          <GlobeAmericasIcon className="w-5 h-5 mr-1" />
          TFC
        </Link>
      </div>
      <div className="navbar-end">
        <Link to="/studios" className="btn btn-ghost btn-circle">
          <MagnifyingGlassIcon className="w-5 h-5" />
        </Link>
        <Link to="/account" className="btn btn-ghost btn-circle">
          <UserCircleIcon className="w-5 h-5" />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
