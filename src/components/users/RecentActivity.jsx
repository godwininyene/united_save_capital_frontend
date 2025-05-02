import { 
  FaCheckCircle, 
  FaTimesCircle, 
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowDown
} from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { MdSwapHoriz } from "react-icons/md";
import axios from "../../lib/axios";
import { useEffect, useState } from "react";
import LoadingIndicator from "../common/LoadingIndicator";
import { Link } from "react-router-dom";

const statusIcons = {
  completed: <FaCheckCircle className="text-green-500" />,
  failed: <FaTimesCircle className="text-red-500" />,
  pending: <BsThreeDots className="text-gray-500" />,
  refunded: <FaExclamationTriangle className="text-yellow-500" />,
  approved: <FaCheckCircle className="text-blue-500" />
};

const typeIcons = {
  deposit: <FaArrowDown className="text-green-500" />,
  withdrawal: <FaArrowUp className="text-red-500" />,
  transfer: <MdSwapHoriz className="text-blue-500" />,
  card_deposit: <FaArrowDown className="text-green-500" />,
  crypto_deposit: <FaArrowDown className="text-purple-500" />
};

const RecentActivity = () => {
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [processing, setProcessing] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
  };

  const formatAmount = (amount, type) => {
    const sign = type === 'deposit' || type === 'card_deposit' || type === 'crypto_deposit' ? '+' : '-';
    return `${sign} $${amount.toFixed(2)}`;
  };

  const getDescription = (transaction) => {
    if (transaction.type === 'transfer') {
      return `Transfer to ${transaction.beneficiaryName || transaction.beneficiaryAcct}`;
    } else if (transaction.type === 'deposit' && transaction.depositType === 'card deposit') {
      return `Deposit via ${transaction.cardType || 'Card'}`;
    } else if (transaction.type ==='deposit' && transaction.depositType === 'crypto deposit') {
      return `Crypto deposit (${transaction.coin?.toUpperCase()})`;
    } 
    return 'Transaction';
  };

  const fetchRecent = async () => {
    setProcessing(true);
    try {
      const res = await axios.get('api/v1/transactions/recent');
      setRecentTransactions(res.data.data.recents);  
      setFetched(true);
    } catch (err) {
      setFetched(true);
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    fetchRecent();
  }, []);

  if (processing) {
    return (
      <div className="mt-6 bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <LoadingIndicator text="Loading recent transactions..." />
      </div>
    );
  }

  if (fetched && recentTransactions.length === 0) {
    return (
      <div className="mt-6 bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
          <Link to={'/account/user/transactions'} className="cursor-pointer text-blue-600 text-sm font-medium hover:underline">
            View All
          </Link>
        </div>
        <p className="text-gray-500 text-center py-4">No recent transactions found</p>
      </div>
    );
  }

  return (
    <div className="mt-6 bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
        <Link to={'/account/user/transactions'} className="cursor-pointer text-blue-600 text-sm font-medium hover:underline">
          View All
        </Link>
      </div>
      
      <div className="space-y-4">
        {recentTransactions.map((transaction) => (
          <div 
            key={transaction._id} 
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-full">
                {typeIcons[transaction.type] || typeIcons.transfer}
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  {getDescription(transaction)}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">
                    {formatDate(transaction.createdAt)}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full capitalize">
                    {transaction.type.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className={`font-medium ${
                  transaction.type === 'deposit' || 
                  transaction.type === 'card_deposit' || 
                  transaction.type === 'crypto_deposit' 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {formatAmount(transaction.amount, transaction.type)}
                </p>
                <p className="text-xs text-gray-500">
                  Fee: ${(transaction.fee || 0).toFixed(2)}
                </p>
              </div>
              <div className="text-lg">
                {statusIcons[transaction.status] || statusIcons.pending}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;