import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar bg-primary text-primary-content sticky top-0 z-50">
      <div className="hidden sm:block sm:navbar-start"></div>
      <div className="navbar-start sm:navbar-center justify-start sm:justify-center">
        <Link to="/" className="btn btn-ghost normal-case text-2xl font-black">
          <svg
            className="w-[1.2rem] h-[1.2rem] mr-1"
            viewBox="0 0 512 512"
            fill="currentColor"
          >
            <path d="M365.295,169.167l23.743-45.191c13.781-26.23,12.839-57.757-2.484-83.117C371.23,15.498,343.76,0,314.13,0H197.87 c-29.63,0-57.102,15.498-72.425,40.858c-15.323,25.36-16.265,56.887-2.484,83.117l23.743,45.191 C86.453,206.079,46.167,272.531,46.167,348.22c0,51.262,18.693,100.62,52.636,138.979c13.946,15.76,34.021,24.8,55.078,24.8 h204.24c21.057,0,41.131-9.039,55.077-24.8c33.943-38.36,52.636-87.718,52.636-138.979 C465.833,272.532,425.546,206.08,365.295,169.167z M321.92,98.378l-23.308,44.363c-13.764-2.851-28.017-4.354-42.613-4.354 s-28.849,1.502-42.613,4.354l-23.308-44.363c-3.007-5.724-2.802-12.605,0.542-18.14c3.344-5.534,9.339-8.917,15.806-8.917h99.148 c6.467,0,12.462,3.382,15.806,8.917C324.723,85.773,324.929,92.653,321.92,98.378z" />
          </svg>
          TFC
        </Link>
      </div>
      <div className="navbar-end">
        <Link to="/studios" className="btn btn-ghost">
          Find a Studio
        </Link>
        <Link to="/account" className="btn btn-ghost btn-circle">
          <UserCircleIcon className="w-5 h-5" />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
