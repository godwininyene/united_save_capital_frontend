import {
  FiPlusCircle,
  FiSend,
  FiDollarSign,
  FiCreditCard,
  FiPieChart,
  FiHome,
  FiShield,
  FiUserPlus,
  FiAlertCircle,
  FiBell,
  FiAward,
  FiDollarSign as FiDollar,
  FiTrendingUp,
} from "react-icons/fi";
import {
  FaBitcoin,
  FaPiggyBank,
  FaHandHoldingUsd,
  FaCreditCard,
  FaFileInvoiceDollar,
  FaCoins
} from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdOutlineReceipt } from "react-icons/md";
import { Link } from "react-router-dom";
import { RiExchangeFundsFill } from "react-icons/ri";
import RecentActivity from "../../components/users/RecentActivity";
import axios from "../../lib/axios";
import { useState, useEffect } from "react";

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const [wallet, setWallet] = useState({});
  const [fetched, setFetched] = useState(false);
  const [stats, setStats] = useState({})
  const fetchWallet = async () => {
    try {
      // const res = await axios.get('api/v1/users/me/wallet');
      const [walletRes, transactionsRes] = await Promise.all([
        axios.get('api/v1/users/me/wallet'),
        axios.get('api/v1/stats/users')
      ]);
      localStorage.setItem("wallet", JSON.stringify(walletRes.data.data.wallet))
      setStats(transactionsRes.data.data.stats);
      setWallet(walletRes.data.data.wallet);
      setFetched(true);
    } catch (err) {
      setFetched(true);
      console.log(err);
    } finally {
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="">
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-8">
          <div className="flex flex-col mb-4 md:mb-0">
            <h1 className="my-1 font-semibold text-gray-800 dark:text-slate-100 text-lg sm:text-xl">
              Welcome {user?.fullname}, 👋🏼
            </h1>
            <p className="text-gray-600 dark:text-slate-400 text-sm sm:text-base">Hi, What would you like to do today with United Save Capital?</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link to={'/account/user/deposit_money'} className="cursor-pointer group flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 text-white font-medium rounded-lg shadow-md transition-all duration-300 bg-[#FF4E50] hover:bg-[#e04547] hover:scale-105 text-sm sm:text-base">
              <FiPlusCircle className="text-lg sm:text-xl group-hover:animate-spin" />
              Cash Top Up
            </Link>

            <Link to={'/account/user/wire_transfer'} className="cursor-pointer group flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 font-medium text-[#FF4E50] border-2 border-[#FF4E50] rounded-lg shadow-md transition-all duration-300 bg-white dark:bg-slate-800 dark:text-slate-100 dark:border-[#FF4E50] hover:bg-[#FF4E50] hover:text-white hover:scale-105 text-sm sm:text-base">
              <FiSend className="text-lg sm:text-xl group-hover:animate-spin" />
              Send Money
            </Link>
          </div>
        </div>

        {/* Account Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Savings Account */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border-l-4 border-[#FF4E50] dark:border-[#FF4E50]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-gray-500 dark:text-slate-400 font-medium">SAVINGS</h3>

                <p className="text-2xl font-bold text-gray-800 dark:text-slate-100">
                  {`${wallet?.currency || ''}${wallet?.saving?.toLocaleString('en-US') || 'N/A'}`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-500 dark:text-slate-400 text-sm">ACCOUNT NUMBER</p>
                <p className="font-bold text-gray-800 dark:text-slate-100 tracking-[3px]">{`${wallet?.savingAccountNumber || 'N/A'}`}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6">
              <div>
                <p className="text-gray-500 dark:text-slate-400 text-sm">TOTAL CREDIT {formatDate(new Date())}</p>
                <p className="font-semibold text-gray-800 dark:text-slate-100">{`${wallet?.currency || ''}${stats?.total_savings_credit?.toLocaleString('en-US') || 'N/A'}`}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-slate-400 text-sm">TOTAL DEBIT {formatDate(new Date())}</p>
                <p className="font-semibold text-gray-800 dark:text-slate-100">{`${wallet?.currency || ''}${stats?.total_savings_debit?.toLocaleString('en-US') || 'N/A'}`}</p>
              </div>
            </div>
          </div>

          {/* Checking Account */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border-l-4 border-[#F9D423] dark:border-[#F9D423]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-gray-500 dark:text-slate-400 font-medium">CHECKINGS</h3>
                <p className="text-2xl font-bold text-gray-800 dark:text-slate-100">{`${wallet?.currency || ''}${wallet?.checking?.toLocaleString('en-US') || 'N/A'}`}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500 dark:text-slate-400 text-sm">ACCOUNT NUMBER</p>
                <p className="font-bold text-gray-800 dark:text-slate-100 tracking-[3px]">{`${wallet?.checkingAccountNumber || 'N/A'}`}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6">
              <div>
                <p className="text-gray-500 dark:text-slate-400 text-sm">TOTAL CREDIT {formatDate(new Date())}</p>
                <p className="font-semibold text-gray-800 dark:text-slate-100">{`${wallet?.currency || ''}${stats?.total_checking_credit?.toLocaleString('en-US') || 'N/A'}`}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-slate-400 text-sm">TOTAL DEBIT {formatDate(new Date())}</p>
                <p className="font-semibold text-gray-800 dark:text-slate-100">{`${wallet?.currency || ''}${stats?.total_checking_debit?.toLocaleString('en-US') || 'N/A'}`}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md mb-8">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-100 mb-4">Explore Services</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Wire Transfer */}
            <Link to={'/account/user/wire_transfer'} className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-slate-600 hover:bg-[#FF4E50]/10 dark:hover:bg-[#FF4E50]/20 hover:border-[#FF4E50]/30 transition-colors">
              <div className="w-10 h-10 bg-[#FF4E50]/10 dark:bg-[#FF4E50]/20 rounded-full flex items-center justify-center mb-2">
                <FaMoneyBillTransfer className="text-[#FF4E50] text-lg" />
              </div>
              <span className="text-sm text-center text-gray-700 dark:text-slate-300">Wire Transfer</span>
            </Link>

            {/* Local Transfer */}
            <Link to={'/account/user/local_transfer'} className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-slate-600 hover:bg-[#FF4E50]/10 dark:hover:bg-[#FF4E50]/20 hover:border-[#FF4E50]/30 transition-colors">
              <div className="w-10 h-10 bg-[#FF4E50]/10 dark:bg-[#FF4E50]/20 rounded-full flex items-center justify-center mb-2">
                <RiExchangeFundsFill className="text-[#FF4E50] text-lg" />
              </div>
              <span className="text-sm text-center text-gray-700 dark:text-slate-300">Local Transfer</span>
            </Link>

            {/* Internal Transfer */}
            <Link to={'/account/user/internal_transfer'} className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-slate-600 hover:bg-[#FF4E50]/10 dark:hover:bg-[#FF4E50]/20 hover:border-[#FF4E50]/30 transition-colors">
              <div className="w-10 h-10 bg-[#FF4E50]/10 dark:bg-[#FF4E50]/20 rounded-full flex items-center justify-center mb-2">
                <FaMoneyBillTransfer className="text-[#FF4E50] text-lg" />
              </div>
              <span className="text-sm text-center text-gray-700 dark:text-slate-300">Internal Transfer</span>
            </Link>

            {/* Unified Loans */}
            <Link to={'/account/user/loan_management'} className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-slate-600 hover:bg-[#FF4E50]/10 dark:hover:bg-[#FF4E50]/20 hover:border-[#FF4E50]/30 transition-colors">
              <div className="w-10 h-10 bg-[#FF4E50]/10 dark:bg-[#FF4E50]/20 rounded-full flex items-center justify-center mb-2">
                <FaHandHoldingUsd className="text-[#FF4E50] text-lg" />
              </div>
              <span className="text-sm text-center text-gray-700 dark:text-slate-300">Unified Loans</span>
            </Link>
            {/* Buy Crypto */}
            <Link to={'/account/user/buy_crypto'} className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-slate-600 hover:bg-[#FF4E50]/10 dark:hover:bg-[#FF4E50]/20 hover:border-[#FF4E50]/30 transition-colors">
              <div className="w-10 h-10 bg-[#FF4E50]/10 dark:bg-[#FF4E50]/20 rounded-full flex items-center justify-center mb-2">
                <FaBitcoin className="text-[#FF4E50] text-lg" />
              </div>
              <span className="text-sm text-center text-gray-700 dark:text-slate-300">Buy Crypto</span>
            </Link>

            {/* Card Deposit */}
            <Link to={'/account/user/deposit_money'} className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-slate-600 hover:bg-[#FF4E50]/10 dark:hover:bg-[#FF4E50]/20 hover:border-[#FF4E50]/30 transition-colors">
              <div className="w-10 h-10 bg-[#FF4E50]/10 dark:bg-[#FF4E50]/20 rounded-full flex items-center justify-center mb-2">
                <FiCreditCard className="text-[#FF4E50] text-lg" />
              </div>
              <span className="text-sm text-center text-gray-700 dark:text-slate-300">Card Deposit</span>
            </Link>

            {/* Crypto Deposit */}
            <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-slate-600 hover:bg-[#FF4E50]/10 dark:hover:bg-[#FF4E50]/20 hover:border-[#FF4E50]/30 transition-colors">
              <div className="w-10 h-10 bg-[#FF4E50]/10 dark:bg-[#FF4E50]/20 rounded-full flex items-center justify-center mb-2">
                <FaCoins className="text-[#FF4E50] text-lg" />
              </div>
              <span className="text-sm text-center text-gray-700 dark:text-slate-300">Crypto Deposit</span>
            </button>

            {/* Saving Statement */}
            <Link to={'/account/user/savings_statement'} className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-slate-600 hover:bg-[#FF4E50]/10 dark:hover:bg-[#FF4E50]/20 hover:border-[#FF4E50]/30 transition-colors">
              <div className="w-10 h-10 bg-[#FF4E50]/10 dark:bg-[#FF4E50]/20 rounded-full flex items-center justify-center mb-2">
                <MdOutlineReceipt className="text-[#FF4E50] text-lg" />
              </div>
              <span className="text-sm text-center text-gray-700 dark:text-slate-300">Savings Statement</span>
            </Link>

            {/* Checking Statement */}
            <Link to={'/account/user/checking_statement'} className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-slate-600 hover:bg-[#FF4E50]/10 dark:hover:bg-[#FF4E50]/20 hover:border-[#FF4E50]/30 transition-colors">
              <div className="w-10 h-10 bg-[#FF4E50]/10 dark:bg-[#FF4E50]/20 rounded-full flex items-center justify-center mb-2">
                <MdOutlineReceipt className="text-[#FF4E50] text-lg" />
              </div>
              <span className="text-sm text-center text-gray-700 dark:text-slate-300">Checking Statement</span>
            </Link>


            {/* Unified Investments */}
            <Link to={'/account/user/investment'} className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-slate-600 hover:bg-[#FF4E50]/10 dark:hover:bg-[#FF4E50]/20 hover:border-[#FF4E50]/30 transition-colors">
              <div className="w-10 h-10 bg-[#FF4E50]/10 dark:bg-[#FF4E50]/20 rounded-full flex items-center justify-center mb-2">
                <FiTrendingUp className="text-[#FF4E50] text-lg" />
              </div>
              <span className="text-sm text-center text-gray-700 dark:text-slate-300">Unified Investments</span>
            </Link>

            {/* Unified Support */}
            <Link to={'/account/user/support'} className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-slate-600 hover:bg-[#FF4E50]/10 dark:hover:bg-[#FF4E50]/20 hover:border-[#FF4E50]/30 transition-colors">
              <div className="w-10 h-10 bg-[#FF4E50]/10 dark:bg-[#FF4E50]/20 rounded-full flex items-center justify-center mb-2">
                <FiAward className="text-[#FF4E50] text-lg" />
              </div>
              <span className="text-sm text-center text-gray-700 dark:text-slate-300">Unified Support</span>
            </Link>

            {/* United Cards */}
            <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-slate-600 hover:bg-[#FF4E50]/10 dark:hover:bg-[#FF4E50]/20 hover:border-[#FF4E50]/30 transition-colors">
              <div className="w-10 h-10 bg-[#FF4E50]/10 dark:bg-[#FF4E50]/20 rounded-full flex items-center justify-center mb-2">
                <FaCreditCard className="text-[#FF4E50] text-lg" />
              </div>
              <span className="text-sm text-center text-gray-700 dark:text-slate-300">United Cards</span>
            </button>



            {/* Add Beneficiary */}
            <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-slate-600 hover:bg-[#FF4E50]/10 dark:hover:bg-[#FF4E50]/20 hover:border-[#FF4E50]/30 transition-colors">
              <div className="w-10 h-10 bg-[#FF4E50]/10 dark:bg-[#FF4E50]/20 rounded-full flex items-center justify-center mb-2">
                <FiUserPlus className="text-[#FF4E50] text-lg" />
              </div>
              <span className="text-sm text-center text-gray-700 dark:text-slate-300">Add Beneficiary</span>
            </button>

            {/* Check Deposit */}
            <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-slate-600 hover:bg-[#FF4E50]/10 dark:hover:bg-[#FF4E50]/20 hover:border-[#FF4E50]/30 transition-colors">
              <div className="w-10 h-10 bg-[#FF4E50]/10 dark:bg-[#FF4E50]/20 rounded-full flex items-center justify-center mb-2">
                <FaFileInvoiceDollar className="text-[#FF4E50] text-lg" />
              </div>
              <span className="text-sm text-center text-gray-700 dark:text-slate-300">Check Deposit</span>
            </button>

            {/* Unified Alerts */}
            <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-slate-600 hover:bg-[#FF4E50]/10 dark:hover:bg-[#FF4E50]/20 hover:border-[#FF4E50]/30 transition-colors">
              <div className="w-10 h-10 bg-[#FF4E50]/10 dark:bg-[#FF4E50]/20 rounded-full flex items-center justify-center mb-2">
                <FiBell className="text-[#FF4E50] text-lg" />
              </div>
              <span className="text-sm text-center text-gray-700 dark:text-slate-300">Unified Alerts</span>
            </button>

            {/* United Tips */}
            <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-slate-600 hover:bg-[#FF4E50]/10 dark:hover:bg-[#FF4E50]/20 hover:border-[#FF4E50]/30 transition-colors">
              <div className="w-10 h-10 bg-[#FF4E50]/10 dark:bg-[#FF4E50]/20 rounded-full flex items-center justify-center mb-2">
                <FiAlertCircle className="text-[#FF4E50] text-lg" />
              </div>
              <span className="text-sm text-center text-gray-700 dark:text-slate-300">United Tips</span>
            </button>

            {/* Auto Save */}
            <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-slate-600 hover:bg-[#FF4E50]/10 dark:hover:bg-[#FF4E50]/20 hover:border-[#FF4E50]/30 transition-colors">
              <div className="w-10 h-10 bg-[#FF4E50]/10 dark:bg-[#FF4E50]/20 rounded-full flex items-center justify-center mb-2">
                <FaPiggyBank className="text-[#FF4E50] text-lg" />
              </div>
              <span className="text-sm text-center text-gray-700 dark:text-slate-300">Auto Save</span>
            </button>
          </div>
          <div className="mt-6 p-4 bg-[#F9D423]/10 dark:bg-[#F9D423]/20 rounded-lg border border-[#F9D423]/30 dark:border-[#F9D423]/40">
            <p className="text-sm text-gray-700 dark:text-slate-300">
              <span className="font-semibold text-[#FF4E50]">Auto Save:</span> Set a goal, save automatically with United Save Capital's Auto Save and track your progress.
            </p>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Budget */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border-t-4 border-[#FF4E50] dark:border-[#FF4E50]">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#FF4E50]/10 dark:bg-[#FF4E50]/20 rounded-lg">
                <FiPieChart className="text-[#FF4E50] text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-100 mb-2">Budget</h3>
                <p className="text-gray-600 dark:text-slate-400 text-sm">
                  Check in with your budget and stay on top of your spending.
                </p>
              </div>
            </div>
          </div>

          {/* Home Option */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border-t-4 border-[#F9D423] dark:border-[#F9D423]">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#F9D423]/10 dark:bg-[#F9D423]/20 rounded-lg">
                <FiHome className="text-[#F9D423] text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-100 mb-2">Home Option</h3>
                <p className="text-gray-600 dark:text-slate-400 text-sm">
                  Your home purchase, refinance and insights right under one roof.
                </p>
              </div>
            </div>
          </div>

          {/* Security Tip */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border-t-4 border-[#FF4E50] dark:border-[#FF4E50]">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#FF4E50]/10 dark:bg-[#FF4E50]/20 rounded-lg">
                <FiShield className="text-[#FF4E50] text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-100 mb-2">Security Tip</h3>
                <p className="text-gray-600 dark:text-slate-400 text-sm">
                  We will NEVER ask you to provide your security details such as COT Code or any sensitive details of your account.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Beneficiaries Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-100">Beneficiaries</h3>
            <button className="flex items-center gap-1 text-[#FF4E50] text-sm font-medium hover:underline">
              <FiUserPlus className="text-base" />
              Add New
            </button>
          </div>
          <div className="text-center py-8 border-2 border-dashed border-gray-200 dark:border-slate-600 rounded-lg">
            <p className="text-gray-500 dark:text-slate-400">No Beneficiary</p>
          </div>
        </div>
        <RecentActivity className="mt-8" />
      </div>
    </div>
  );
};

export default UserDashboard;