import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const routes = <>
    <NavLink to="/"><span className="font-bold">Home</span></NavLink>
    <NavLink to="/addSchedule"><span className="font-bold">Add Schedule</span></NavLink>
    <NavLink to="/allSchedule"><span className="font-bold">All Schedule</span></NavLink>
    <NavLink to="/signIn"><span className="font-bold">Sign In</span></NavLink>
    </>
  return (
    <div className="navbar bg-base-200 lg:px-20 px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-56 p-3 shadow"
          >
          {routes}
          </ul>
        </div>
        <a className="btn btn-ghost text-2xl font-bold">MZ Fitness</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-2 *:ml-3">
         {routes}
        </ul>
      </div>
      <div className="navbar-end">
        <Link to="/signIn" className="btn btn-success text-white font-bold">Sign In</Link>
      </div>
    </div>
  );
};

export default Navbar;
