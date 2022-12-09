import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar bg-primary text-primary-content sticky top-0">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Toronto Fitness Club
        </Link>
      </div>
      <div className="navbar-end">
        <div className="tooltip tooltip-bottom" data-tip="Find Studios">
          <Link to="/studios" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Profile">
          <Link to="/profile" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
