import { useState, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get('api/v1/transactions');
      setTransactions(res.data.data.transactions || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch transactions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Filter transactions based on active tab and search query
  const filteredTransactions = transactions.filter(transaction => {
    const matchesTab = activeTab === "all" || 
                      (activeTab === "deposit" && transaction.type === "deposit") ||
                      (activeTab === "withdrawal" && transaction.type === "withdrawal") ||
                      (activeTab === "transfer" && transaction.type === "transfer");
    
    const matchesSearch = 
      (transaction.beneficiaryName?.toLowerCase().includes(searchQuery.toLowerCase())) || 
      (transaction.amount?.toString().includes(searchQuery)) ||
      (transaction.reference?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (transaction.description?.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && (searchQuery ? matchesSearch : true);
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
      default:
        return <FaCreditCard className="text-primary-2" />;
    }
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getTransactionDescription = (transaction) => {
    switch(transaction.type) {
      case "transfer":
        return transaction.transferType === "wire transfer" 
          ? `Wire Transfer to ${transaction.beneficiaryName}`
          : `Transfer to ${transaction.beneficiaryName}`;
      case "deposit":
        return `Deposit via ${transaction.depositType}`;
      default:
        return transaction.description || "Transaction";
    }
  };

  return (
    <div className="">
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-xl font-semibold text-gray-800 mb-1">Transaction History</h1>
            <p className="text-gray-600">View and manage all your transactions</p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              onClick={fetchTransactions}
            >
              <FiRefreshCw className={`text-gray-500 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <FiDownload className="text-gray-500" />
              <span>Export</span>
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
              className={`px-4 py-2 mr-2 cursor-pointer rounded-lg whitespace-nowrap ${activeTab === "all" ? 'bg-primary-2 text-white' : 'bg-white text-gray-700'}`}
            >
              All Transactions
            </button>
            <button
              onClick={() => setActiveTab("deposit")}
              className={`px-4 py-2 mr-2 cursor-pointer rounded-lg whitespace-nowrap ${activeTab === "deposit" ? 'bg-green-100 text-green-800' : 'bg-white text-gray-700'}`}
            >
              Deposits
            </button>
            <button
              onClick={() => setActiveTab("withdrawal")}
              className={`px-4 py-2 mr-2 cursor-pointer rounded-lg whitespace-nowrap ${activeTab === "withdrawal" ? 'bg-red-100 text-red-800' : 'bg-white text-gray-700'}`}
            >
              Withdrawals
            </button>
            <button
              onClick={() => setActiveTab("transfer")}
              className={`px-4 py-2 mr-2 cursor-pointer rounded-lg whitespace-nowrap ${activeTab === "transfer" ? 'bg-blue-100 text-blue-800' : 'bg-white text-gray-700'}`}
            >
              Transfers
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {/* Transactions List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {isLoading ? (
            <div className="p-8 flex justify-center">
              <LoadingIndicator />
            </div>
          ) : filteredTransactions.length === 0 ? (
            <div className="p-8 text-center">
              <FiRefreshCw className="mx-auto text-gray-400 text-3xl mb-3" />
              <h3 className="text-lg font-medium text-gray-700">
                {transactions.length === 0 ? 'No transactions found' : 'No matching transactions'}
              </h3>
              <p className="text-gray-500 mt-1">
                {transactions.length === 0 
                  ? 'You have not made any transactions yet' 
                  : 'Try adjusting your search or filter criteria'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <div key={transaction._id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-gray-100 mr-4">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {getTransactionDescription(transaction)}
                        </p>
                        <p className={`text-sm font-medium ml-2 ${
                          transaction.type === 'deposit' ? 'text-green-600' : 
                          transaction.type === 'transfer' ? 'text-red-600' : 
                          'text-gray-900'
                        }`}>
                          {transaction.type === 'deposit' ? '+' : '-'}
                          ${transaction.amount}
                        </p>
                      </div>
                      <div className="flex justify-between mt-1">
                        <div>
                          <p className="text-xs text-gray-500">
                            {formatDate(transaction.createdAt)}
                          </p>
                          <p className="text-xs text-gray-800 bg-gray-100 px-2 py-1 rounded-full inline-block mt-1">
                            {transaction.type}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500">
                          Ref: {transaction.reference}
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

        {/* Pagination - Removed for now since API response doesn't include pagination data */}
        {/* Can be implemented once API supports pagination */}
      </div>
    </div>
  );
};

export default Transactions;