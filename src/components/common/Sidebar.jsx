import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { 
  FaTachometerAlt, 
  FaMoneyCheckAlt, 
  FaHandHoldingUsd, 
  FaHistory, 
  FaExchangeAlt, 
  FaCog 
} from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { logo } from "../../assets";
import { logout } from "../../utils/logout";
import { HiOutlineLogout } from 'react-icons/hi';
import LoadingIndicator from "./LoadingIndicator";

const Sidebar = ({user, isToggle, setToggle}) => {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Close sidebar when route changes
  useEffect(() => {
      setToggle(false);
  }, [location.pathname, setToggle]);

  const user_links = [
    { name: "Dashboard", path: "user/dashboard", icon: <FaTachometerAlt /> },
    { name: "Wire Transfer", path: "user/wire_transfer", icon: <FaMoneyBillTransfer /> },
    { name: "Deposit Money", path: "user/deposit_money", icon: <FaMoneyCheckAlt /> },
    { name: "Loan Management", path: "user/loan_management", icon: <FaHandHoldingUsd /> },
    { name: "Transactions", path: "user/transactions", icon: <FaExchangeAlt /> },
    { name: "Settings", path: "user/settings", icon: <FaCog /> },
  ];
  
  const admin_links = [
    { name: "Dashboard", path: "admin/dashboard", icon: <FaTachometerAlt /> },
    { name: "Manage Users", path: "admin/manage_users", icon: <FaCog /> },
    { name: "Transactions", path: "admin/manage_transactions", icon: <FaExchangeAlt /> },
    { name: "Manage Loans", path: "admin/manage_loans", icon: <FaHandHoldingUsd /> },
    { name: "Deposit Requests", path: "admin/deposit_requests", icon: <FaMoneyCheckAlt /> },
    { name: "Settings", path: "admin/settings", icon: <FaCog /> },
  ];

  const role = user.role;
  const links = role === "admin" ? admin_links : user_links

  const handleLogout = async () => {
    setProcessing(true);
    try {
      const res = await logout(navigate);
      setProcessing(false);
    } catch (err) {
      setProcessing(false);
      console.log(err);
    }
  };

  return (
    <div
        className={`fixed top-[65px] w-64 md:top-0 h-[calc(100vh-65px)] md:h-screen bg-white dark:bg-slate-800 shadow-lg transition-transform duration-300 ease-in-out transform ${
                isToggle ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            } z-40 overflow-y-auto`}
      >
      {/* Sidebar Container */}
      <div className="h-full flex flex-col bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700">
        {/* Brand Header */}
        <div className={`p-4 border-b border-gray-200 dark:border-slate-700 ${isOpen ? "flex items-center justify-between" : "flex justify-center"}`}>
          {isOpen && (
            <div className="flex items-center gap-2">
              <img src={logo} alt="United Save Capital" className="h-8" />
              <h1 className="text-sm text-gray-800 dark:text-slate-100">United Save Capital</h1>
            </div>
          )}
          {!isOpen && <img src={logo} alt="USC" className="h-8" />}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-2">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-3 p-3 my-1 rounded-lg transition-all ${
                location.pathname.split('/account/')[1] === link.path
                  ? "bg-primary-2/10 dark:bg-blue-500/20 text-primary-2 dark:text-blue-400 font-medium"
                  : "text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700"
              }`}
            >
              <span className={`text-lg ${
                location.pathname.split('/account/')[1] === link.path 
                  ? "text-primary-2 dark:text-blue-400" 
                  : "text-gray-500 dark:text-slate-400"
              }`}>
                {link.icon}
              </span>
              <span className={`${isOpen ? "block" : "hidden"}`}>
                {link.name}
              </span>
            </Link>
          ))}

           {/* Logout Button */}
           <button
              onClick={handleLogout}
              className="flex items-center w-full cursor-pointer justify-center gap-2 p-3 mt-4 text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors duration-200"
            >
              {processing ? (
                <LoadingIndicator size={5} />
              ) : (
                <>
                    <HiOutlineLogout className="h-5 w-5" />
                    <span>Logout</span>
                </>
              )}
            </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;