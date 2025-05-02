import { useState, useEffect } from 'react';
import { 
  FiDollarSign, 
  FiArrowUp, 
  FiArrowDown, 
  FiSearch,
  FiFilter,
  FiEye,
  FiCheck,
  FiX,
  FiDownload,
  FiUser,
  FiCalendar,
  FiRefreshCw
} from 'react-icons/fi';
import { BsWallet2, BsArrowLeftRight } from 'react-icons/bs';
import moment from 'moment';
import Modal from '../../components/CustomModal';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import EmptyState from '../../components/common/EmptyState';
import SelectField from '../../components/common/SelectField';
import defaultAvatar from '../../assets/default.png';
import axios from '../../lib/axios';

const Transactions = () => {
  const base_url = import.meta.env.VITE_APP_BASE_URL;
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [approving, setApproving] = useState(false);
  const [declining, setDeclining] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [fetched, setFetched] = useState(false);
  const [stats, setStats] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    dateRange: 'all'
  });

  // Display success message for 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Fetch transactions and stats data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [transactionsResponse, statsResponse] = await Promise.all([
        axios.get('api/v1/transactions'),
        axios.get('api/v1/stats/admin')
      ]);
     
      if (transactionsResponse.data.status === 'success') {
        setTransactions(transactionsResponse.data.data.transactions);
        setFilteredTransactions(transactionsResponse.data.data.transactions);
      }
  
      if (statsResponse.data.status === 'success') {
        setStats(statsResponse.data.data.stats);
      }
      
      setFetched(true);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setErrors({ general: 'Failed to fetch transactions. Please try again.' });
      setFetched(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Apply filters
  useEffect(() => {
    if (!fetched) return;
    
    let results = [...transactions];
    
    if (filters.type !== 'all') {
      results = results.filter(tx => tx.type === filters.type);
    }
    
    if (filters.status !== 'all') {
      results = results.filter(tx => tx.status === filters.status);
    }
    
    if (filters.dateRange !== 'all') {
      const now = moment();
      results = results.filter(tx => {
        const txDate = moment(tx.createdAt);
        switch(filters.dateRange) {
          case 'today':
            return txDate.isSame(now, 'day');
          case 'week':
            return txDate.isSame(now, 'week');
          case 'month':
            return txDate.isSame(now, 'month');
          default:
            return true;
        }
      });
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(tx => 
        tx.reference?.toLowerCase().includes(term) || 
        tx.user?.fullname?.toLowerCase().includes(term) ||
        tx.amount.toString().includes(term)
      );
    }
    
    setFilteredTransactions(results);
  }, [filters, searchTerm, transactions, fetched]);

  const handleApprove = async (transactionId, type) => {
    setApproving(true);
    setErrors({});
    try {
      const response = await axios.patch(`api/v1/transactions/${transactionId}/action/approve?type=${type ||selectedTransaction.type}`);
      if (response.data.status === 'success') {
        setSuccessMessage("Transaction approved successfully!");
        setTransactions(prev => 
          prev.map(tx => 
            tx._id === transactionId ? response.data.data.transaction : tx
          )
        );
        if (selectedTransaction?._id === transactionId) {
          setSelectedTransaction({ ...selectedTransaction, status: 'success' });
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setErrors({ general: error.response.data.message || 'Failed to approve transaction' });
        }
      } else {
        setErrors({ general: 'Network error. Please try again.' });
      }
      console.error('Transaction error:', error);
    } finally {
      setApproving(false);
      setIsModalOpen(false);
    }
  };

  const handleDecline = async (transactionId, type) => {
    setDeclining(true);
    setErrors({});
    try {
      const response = await axios.patch(`api/v1/transactions/${transactionId}/action/decline?type=${type ||selectedTransaction.type}`);
      if (response.data.status === 'success') {
        setSuccessMessage("Transaction declined successfully!");
        setTransactions(prev => 
          prev.map(tx => 
            tx._id === transactionId ? response.data.data.transaction : tx
          )
        );
        if (selectedTransaction?._id === transactionId) {
          setSelectedTransaction({ ...selectedTransaction, status: 'declined' });
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setErrors({ general: error.response.data.message || 'Failed to decline transaction' });
        }
      } else {
        setErrors({ general: 'Network error. Please try again.' });
      }
      console.error('Failed to decline transaction:', error);
    } finally {
      setDeclining(false);
      setIsModalOpen(false);
    }
  };

  const handleExport = () => {
    // Implement export functionality
    alert('Export functionality would be implemented here');
  };

  const handleRefresh = () => {
    setErrors({});
    setSuccessMessage("");
    fetchData();
  };

  const TransactionIcon = ({ type }) => {
    switch(type) {
      case 'deposit':
        return <FiArrowDown className="text-green-500 text-xl" />;
      case 'withdrawal':
        return <FiArrowUp className="text-red-500 text-xl" />;
      case 'transfer':
        return <BsArrowLeftRight className="text-blue-500 text-xl" />;
      default:
        return <FiDollarSign className="text-gray-500 text-xl" />;
    }
  };

  const StatusBadge = ({ status }) => {
    const baseClass = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch(status) {
      case 'success':
        return <span className={`${baseClass} bg-green-100 text-green-800`}>Successful</span>;
      case 'pending':
        return <span className={`${baseClass} bg-yellow-100 text-yellow-800`}>Pending</span>;
      case 'declined':
        return <span className={`${baseClass} bg-red-100 text-red-800`}>Declined</span>;
      default:
        return <span className={`${baseClass} bg-gray-100 text-gray-800`}>{status}</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FiDollarSign className="text-primary-2" /> Transaction Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            View and manage all financial transactions
          </p>
        </div>
        
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <button
            onClick={handleRefresh}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
            disabled={loading}
          >
            <FiRefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
          >
            <FiDownload className="h-5 w-5" /> Export
          </button>
        </div>
      </div>

      {/* Error and Success Messages */}
      {errors.general && (
        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiX className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{errors.general}</p>
            </div>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiCheck className="h-5 w-5 text-green-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{successMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search transactions..."
              className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-2 focus:border-primary-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <SelectField
            options={[
              { value: 'all', label: 'All Types' },
              { value: 'deposit', label: 'Deposits' },
              { value: 'withdrawal', label: 'Withdrawals' },
              { value: 'transfer', label: 'Transfers' }
            ]}
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
            icon={<FiFilter />}
            variant="outline"
          />
          
          <SelectField
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'pending', label: 'Pending' },
              { value: 'success', label: 'Completed' },
              { value: 'declined', label: 'Declined' }
            ]}
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            variant="outline"
          />
          
          <SelectField
            options={[
              { value: 'all', label: 'All Time' },
              { value: 'today', label: 'Today' },
              { value: 'week', label: 'This Week' },
              { value: 'month', label: 'This Month' }
            ]}
            value={filters.dateRange}
            onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
            icon={<FiCalendar />}
            variant="outline"
          />
        </div>
      </div>

      {/* Stats Cards */}
      {fetched && stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Total Transactions" 
            value={stats.total_transactions || 0} 
            icon={<FiDollarSign className="text-primary-2" />}
            color="primary-2"
          />
          <StatCard 
            title="Total Deposits" 
            value={`$${stats.total_deposit?.toLocaleString('en-US') || 0}`} 
            icon={<FiArrowDown className="text-green-500" />}
            color="green-500"
          />
          <StatCard 
            title="Total transfer" 
            value={`$${stats.total_transfer?.toLocaleString('en-US') || 0}`} 
            icon={<FiArrowUp className="text-red-500" />}
            color="red-500"
          />
          <StatCard 
            title="Pending Transactions" 
            value={stats.total_pending_transactions || 0} 
            icon={<BsWallet2 className="text-yellow-500" />}
            color="yellow-500"
          />
        </div>
      )}

      {/* Transactions Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y  divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">Transaction</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">User</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">Amount</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">Date</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">Status</th>
              <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {!fetched ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center">
                  <LoadingIndicator type="dots" size={8} />
                </td>
              </tr>
            ) : filteredTransactions.length > 0 ? (
              filteredTransactions.map(transaction => (
                <tr key={transaction._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                        <TransactionIcon type={transaction.type} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 capitalize">
                          {transaction.type}
                        </div>
                        <div className="text-sm text-gray-500">
                          {transaction.reference}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        {transaction.user?.photo ? (
                          <img 
                            src={`${base_url}/${transaction.user.photo}`} 
                            alt={transaction.user.fullname} 
                            className="h-full w-full rounded-full object-cover" 
                          />
                        ) : (
                          <img src={defaultAvatar} className="h-full w-full rounded-full object-cover" />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {transaction.user?.fullname || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {transaction.user?.email || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'deposit' ? '+' : '-'}
                      ${transaction.amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {moment(transaction.createdAt).format('MMM D, YYYY')}
                    </div>
                    <div className="text-sm text-gray-500">
                      {moment(transaction.createdAt).format('h:mm A')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={transaction.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => {
                          setSelectedTransaction(transaction);
                          setIsModalOpen(true);
                        }}
                        className="text-primary-2 hover:text-primary-600 p-1 rounded hover:bg-primary-2/10"
                      >
                        <FiEye />
                      </button>
                      {transaction.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(transaction._id, transaction.type)}
                            className="text-green-500 hover:text-green-700 p-1 rounded hover:bg-green-500/10"
                            disabled={approving}
                          >
                            <FiCheck />
                          </button>
                          <button
                            onClick={() => handleDecline(transaction._id, transaction.type)}
                            className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-500/10"
                            disabled={declining}
                          >
                            <FiX />
                          </button>
                        </>
                      )}

                      {transaction.status === 'success' && (
                        <button
                          onClick={() => handleDecline(transaction._id, transaction.type)}
                          className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-500/10"
                          disabled={declining}
                        >
                          <FiX />
                        </button>
                      )}
                       {transaction.status === 'declined' && (
                       
                        <button
                          onClick={() => handleApprove(transaction._id, transaction.type)}
                          className="text-green-500 hover:text-green-700 p-1 rounded hover:bg-green-500/10"
                          disabled={approving}
                        >
                          <FiCheck />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4">
                  <EmptyState 
                    title="No transactions found"
                    description="Try adjusting your search or filter criteria"
                    icon={<FiDollarSign className="text-gray-400 text-4xl" />}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Transaction Detail Modal */}
      <Modal 
        maxWidth="sm"
        show={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Transaction Details"
      >
        {selectedTransaction && (
          <div className="space-y-4 p-6">
            {errors.general && (
              <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FiX className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{errors.general}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Reference</p>
                <p className="font-medium">{selectedTransaction.reference}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium capitalize">{selectedTransaction.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <StatusBadge status={selectedTransaction.status} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">
                  {moment(selectedTransaction.createdAt).format('MMM D, YYYY h:mm A')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className={`text-xl font-bold ${
                  selectedTransaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {selectedTransaction.type === 'deposit' ? '+' : '-'}
                  ${selectedTransaction.amount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Method</p>
                <p className="font-medium capitalize">
                  {selectedTransaction.depositType || selectedTransaction.transferType || 'N/A'}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">User Details</h3>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                  {selectedTransaction.user?.photo ? (
                    <img 
                      src={`${base_url}/${selectedTransaction.user.photo}`} 
                      alt={selectedTransaction.user.fullname} 
                      className="h-full w-full rounded-full object-cover" 
                    />
                  ) : (
                    <FiUser className="text-gray-400 text-xl" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{selectedTransaction.user?.fullname || 'N/A'}</p>
                  <p className="text-sm text-gray-500">{selectedTransaction.user?.email || 'N/A'}</p>
                </div>
              </div>
            </div>

            {selectedTransaction.status === 'pending' && (
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleDecline(selectedTransaction._id)}
                  className="px-4 py-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2"
                  disabled={declining}
                >
                  {declining ? <LoadingIndicator size={4} /> : <FiX />} Decline
                </button>
                <button
                  onClick={() => handleApprove(selectedTransaction._id)}
                  className="px-4 cursor-pointer py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center gap-2"
                  disabled={approving}
                >
                  {approving ? <LoadingIndicator size={4} /> : <FiCheck />} Approve
                </button>
              </div>
            )}

            {selectedTransaction.status === 'success' && (
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleDecline(selectedTransaction._id)}
                  className="px-4 py-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2"
                  disabled={declining}
                >
                  {declining ? <LoadingIndicator size={4} /> : <FiX />} Decline
                </button>
              </div>
            )}

            {selectedTransaction.status === 'declined' && (
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleApprove(selectedTransaction._id)}
                  className="px-4 cursor-pointer py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center gap-2"
                  disabled={approving}
                >
                  {approving ? <LoadingIndicator size={4} /> : <FiCheck />} Approve
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, color }) => (
  <div className={`bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow`}>
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg bg-${color}/10 text-${color}`}>
        {icon}
      </div>
    </div>
  </div>
);

export default Transactions;