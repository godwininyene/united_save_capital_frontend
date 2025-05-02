import { Outlet, Link } from "react-router-dom";
import { logo } from "../assets";
import bg from "./../assets/banking_hall.jpg";

const GuestLayout = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover pb-3 px-4 lg:px-0 relative" style={{ backgroundImage: `url(${bg})` }}>
      {/* Gradient Overlay */}
      {/* Gradient Overlay using Theme Colors */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/100 to-black/100 opacity-80"></div>

      {/* <div className="absolute h-full inset-0 bg-gradient-to-r from-blue-900 via-indigo-800 to-transparent opacity-75"></div> */}

      {/* Logo */}
      <div className="relative z-10">
        <Link to="/">
          <img
            src={logo}
            alt="Company Logo"
            className="mx-auto w-20 h-20 object-contain hover:scale-105 transition-transform"
          />
        </Link>
      </div>

      {/* Outlet container with full height */}
      <div className="relative z-10 flex-grow flex items-center justify-center w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default GuestLayout;
