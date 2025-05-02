import { useState } from "react";
import { 
  FiArrowDownLeft, 
  FiArrowUpRight, 
  FiDownload, 
  FiFilter,
  FiSearch,
  FiRefreshCw
} from "react-icons/fi";
import { 
  FaExchangeAlt,
  FaMoneyBillWave,
  FaCreditCard,
  FaCoins
} from "react-icons/fa";
import { MdOutlineReceipt } from "react-icons/md";
import axios from "../../lib/axios";
import LoadingIndicator from "../../components/common/LoadingIndicator";

const Transactions = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  


  // Sample transaction data
  const transactions = [
    {
      id: 1,
      type: "deposit",
      amount: 1500,
      currency: "USD",
      description: "Salary Deposit",
      date: "2023-06-15",
      status: "completed",
      account: "SAVINGS - 0526"
    },
    {
      id: 2,
      type: "withdrawal",
      amount: 250,
      currency: "USD",
      description: "ATM Withdrawal",
      date: "2023-06-14",
      status: "completed",
      account: "CHECKING - 0253"
    },
    {
      id: 3,
      type: "transfer",
      amount: 500,
      currency: "USD",
      description: "Wire Transfer to John D.",
      date: "2023-06-12",
      status: "completed",
      account: "SAVINGS - 0526"
    },
    {
      id: 4,
      type: "payment",
      amount: 120,
      currency: "USD",
      description: "Electric Bill Payment",
      date: "2023-06-10",
      status: "pending",
      account: "CHECKING - 0253"
    },
    {
      id: 5,
      type: "deposit",
      amount: 300,
      currency: "USD",
      description: "Freelance Payment",
      date: "2023-06-08",
      status: "completed",
      account: "SAVINGS - 0526"
    },
    {
      id: 6,
      type: "crypto",
      amount: 0.05,
      currency: "BTC",
      description: "Bitcoin Purchase",
      date: "2023-06-05",
      status: "completed",
      account: "CRYPTO WALLET"
    },
    {
      id: 7,
      type: "fee",
      amount: 5,
      currency: "USD",
      description: "Monthly Maintenance Fee",
      date: "2023-06-01",
      status: "completed",
      account: "CHECKING - 0253"
    }
  ];

  // Filter transactions based on active tab and search query
  const filteredTransactions = transactions.filter(transaction => {
    const matchesTab = activeTab === "all" || transaction.type === activeTab;
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         transaction.amount.toString().includes(searchQuery) ||
                         transaction.date.includes(searchQuery);
    return matchesTab && matchesSearch;
  });

  // Get icon based on transaction type
  const getTransactionIcon = (type) => {
    switch(type) {
      case "deposit":
        return <FiArrowDownLeft className="text-green-500" />;
      case "withdrawal":
        return <FiArrowUpRight className="text-red-500" />;
      case "transfer":
        return <FaExchangeAlt className="text-blue-500" />;
      case "payment":
        return <FaMoneyBillWave className="text-purple-500" />;
      case "crypto":
        return <FaCoins className="text-yellow-500" />;
      case "fee":
        return <MdOutlineReceipt className="text-gray-500" />;
      default:
        return <FaCreditCard className="text-primary-2" />;
    }
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="">
      <div className=" flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-xl font-semibold text-gray-800 mb-1">Transaction History</h1>
            <p className="text-gray-600">View and manage all your transactions</p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <FiDownload className="text-gray-500" />
              <span>Export</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <FiFilter className="text-gray-500" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Search and Tabs */}
        <div className="mb-6">
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-primary-2 focus:border-primary-2"
              placeholder="Search transactions..."
            />
          </div>
          <div className="flex overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 mr-2 rounded-lg whitespace-nowrap ${activeTab === "all" ? 'bg-primary-2 text-white' : 'bg-white text-gray-700'}`}
            >
              All Transactions
            </button>
            <button
              onClick={() => setActiveTab("deposit")}
              className={`px-4 py-2 mr-2 rounded-lg whitespace-nowrap ${activeTab === "deposit" ? 'bg-green-100 text-green-800' : 'bg-white text-gray-700'}`}
            >
              Deposits
            </button>
            <button
              onClick={() => setActiveTab("withdrawal")}
              className={`px-4 py-2 mr-2 rounded-lg whitespace-nowrap ${activeTab === "withdrawal" ? 'bg-red-100 text-red-800' : 'bg-white text-gray-700'}`}
            >
              Withdrawals
            </button>
            <button
              onClick={() => setActiveTab("transfer")}
              className={`px-4 py-2 mr-2 rounded-lg whitespace-nowrap ${activeTab === "transfer" ? 'bg-blue-100 text-blue-800' : 'bg-white text-gray-700'}`}
            >
              Transfers
            </button>
            <button
              onClick={() => setActiveTab("payment")}
              className={`px-4 py-2 mr-2 rounded-lg whitespace-nowrap ${activeTab === "payment" ? 'bg-purple-100 text-purple-800' : 'bg-white text-gray-700'}`}
            >
              Payments
            </button>
            <button
              onClick={() => setActiveTab("crypto")}
              className={`px-4 py-2 mr-2 rounded-lg whitespace-nowrap ${activeTab === "crypto" ? 'bg-yellow-100 text-yellow-800' : 'bg-white text-gray-700'}`}
            >
              Crypto
            </button>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {filteredTransactions.length === 0 ? (
            <div className="p-8 text-center">
              <FiRefreshCw className="mx-auto text-gray-400 text-3xl mb-3" />
              <h3 className="text-lg font-medium text-gray-700">No transactions found</h3>
              <p className="text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-gray-100 mr-4">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {transaction.description}
                        </p>
                        <p className={`text-sm font-medium ml-2 ${
                          transaction.type === 'deposit' ? 'text-green-600' : 
                          transaction.type === 'withdrawal' || transaction.type === 'fee' ? 'text-red-600' : 
                          'text-gray-900'
                        }`}>
                          {transaction.type === 'deposit' ? '+' : '-'}
                          {transaction.amount} {transaction.currency}
                        </p>
                      </div>
                      <div className="flex justify-between mt-1">
                       <div>
                       <p className="text-xs text-gray-500">
                          {formatDate(transaction.date)}
                        </p>
                        <p className="text-xs text-gray-800 bg-green-100 px-2 py-1 text-xs text-center rounded-full">
                          {transaction.type}
                        </p>
                       </div>
                        <p className="text-xs text-gray-500">
                          {transaction.account}
                        </p>
                       
                      </div>
                    </div>
                    <div className="ml-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                        transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-lg bg-primary-2 text-white">1</button>
            <button className="px-3 py-1 rounded-lg text-gray-700 hover:bg-gray-100">2</button>
            <button className="px-3 py-1 rounded-lg text-gray-700 hover:bg-gray-100">3</button>
            <span className="px-2 text-gray-500">...</span>
            <button className="px-3 py-1 rounded-lg text-gray-700 hover:bg-gray-100">10</button>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;