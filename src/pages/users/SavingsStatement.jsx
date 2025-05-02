import { useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import SelectField from "../../components/common/SelectField";
import axios from "../../lib/axios";
import LoadingIndicator from "../../components/common/LoadingIndicator";

const SavingsStatement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get('api/v1/transactions');
      // Filter transactions to only include savings account transactions
      const savingsTransactions = (res.data.data.transactions || []).filter(
        transaction => transaction.account === "savings"
      );
      setTransactions(savingsTransactions);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    
    // Add ordinal suffix to day
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const relevantDigits = (day % 100 > 10 && day % 100 < 14) ? 0 : day % 10;
    const suffix = relevantDigits <= 3 ? suffixes[relevantDigits] : suffixes[0];
    
    return `${day}${suffix} ${month}, ${year}`;
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
  };

  const handleDownload = (transactionId) => {
    console.log(`Downloading receipt for transaction ${transactionId}`);
    // Implement download logic here
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Savings Statement</h1>
          <div className="flex items-center justify-between mt-2">
            <h2 className="text-lg text-primary-2 font-medium">Savings Account Statement #000333280526</h2>
            <button className="text-sm text-primary-2 hover:underline flex items-center">
              <FiDownload className="mr-1" /> Download Full Statement
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-8">
            <LoadingIndicator />
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700">No transactions found</h3>
            <p className="text-gray-500 mt-1">You have no savings account transactions yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction._id}>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                      {formatDate(transaction.createdAt)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.type === "deposit" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {transaction.type === "deposit" ? "Credit" : "Debit"}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {formatAmount(transaction.amount)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button 
                        onClick={() => handleDownload(transaction._id)}
                        className="text-primary-2 hover:text-primary-600 flex items-center"
                      >
                        <FiDownload className="mr-1" /> RECEIPT
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavingsStatement;