import { useState } from "react";
import { FiDownload, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SelectField from "../../components/common/SelectField";

const SavingsStatement = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Sample transaction data
  const transactions = [
    { id: 1, date: "26th February, 2025", type: "Debit", amount: "£157,500.00", receipt: true },
    { id: 2, date: "15th February, 2025", type: "Credit", amount: "£60,000.00", receipt: true },
    { id: 3, date: "15th February, 2025", type: "Credit", amount: "£500,000.00", receipt: true },
    { id: 4, date: "15th February, 2025", type: "Credit", amount: "£900,000.00", receipt: true },
    { id: 5, date: "15th February, 2025", type: "Credit", amount: "£800,000.00", receipt: true },
    { id: 6, date: "15th February, 2025", type: "Credit", amount: "£500,000.00", receipt: true },
    { id: 7, date: "15th February, 2025", type: "Credit", amount: "£700,000.00", receipt: true },
    { id: 8, date: "15th February, 2025", type: "Credit", amount: "£500,000.00", receipt: true },
    { id: 9, date: "15th January, 2025", type: "Credit", amount: "£78,904.00", receipt: true },
    { id: 10, date: "3rd December, 2024", type: "Credit", amount: "£120,000.00", receipt: true },
  ];

  const totalEntries = 38; // Total number of entries from API
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  // Handle download receipt
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

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Show</span>
            <SelectField
              options={[10, 25, 50].map(num => ({ value: num, label: `${num} entries` }))}
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              variant="outline"
              classNames="w-32 border-b-2 border-gray-200 py-1 px-0"
            />
          </div>
        </div>

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
                <tr key={transaction.id}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">{transaction.date}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.type === "Credit" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    {transaction.amount}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.receipt && (
                      <button 
                        onClick={() => handleDownload(transaction.id)}
                        className="text-primary-2 hover:text-primary-600 flex items-center"
                      >
                        <FiDownload className="mr-1" /> RECEIPT
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4 px-4 py-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
            <span className="font-medium">{totalEntries}</span> entries
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              <FiChevronLeft />
            </button>
            {[1, 2, 3, 4].map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md ${currentPage === page ? 'bg-primary-2 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsStatement;