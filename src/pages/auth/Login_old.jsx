import { Link } from "react-router-dom";
import bg from "./../../assets/banking_hall.jpg";
import logo from "./../../assets/logo.svg";

const Login = () => {
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      
      <div className="relative w-full max-w-md px-8 py-6 border border-gray-300 rounded-lg shadow-lg bg-white/10 backdrop-blur-md">
        {/* Login Box */}
        <div className="relative z-10 text-white text-center">
          {/* Logo */}
          <div className="mb-6">
            <Link to="/">
              <img
                src={logo}
                alt="Company Logo"
                className="mx-auto w-20 h-20 object-contain hover:scale-105 transition-transform"
              />
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-6">
            <span className="text-lg font-semibold border-b-2 border-[#F9D423] pb-1 px-3 cursor-pointer">
              SIGN IN
            </span>
            <span className="text-lg font-semibold text-gray-300 pb-1 px-3 cursor-pointer hover:text-[#F9D423] transition-all">
              SIGN UP
            </span>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <div className="text-left">
              <label className="block text-sm font-medium mb-1 text-gray-300">USERNAME</label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full py-2 px-3 rounded-md bg-[rgba(255,255,255,0.2)] text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F9D423] transition-all"
              />
            </div>

            <div className="text-left">
              <label className="block text-sm font-medium mb-1 text-gray-300">PASSWORD</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full py-2 px-3 rounded-md bg-[rgba(255,255,255,0.2)] text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F9D423] transition-all"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input type="checkbox" className="mr-2 accent-[#FF4E50]" />
                <span>Keep me signed in</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF4E50] hover:bg-[#F9D423] text-white font-semibold cursor-pointer py-2 rounded-md transition-all"
            >
              SIGN IN
            </button>

            <div className="h-[1px] w-full bg-gray-400 mt-7"></div>

            <p className="text-sm text-gray-300 mt-4 cursor-pointer hover:text-[#F9D423] transition-all">
              Forgot Password?
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
