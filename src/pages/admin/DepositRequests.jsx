import React, { useState, useEffect } from "react";
import axios from "../../lib/axios";
import { 
  FaCheck, 
  FaTimes, 
  FaSearch, 
  FaBitcoin,
  FaEye,
  FaDownload,
  FaSyncAlt
} from "react-icons/fa";
import { 
  FiAlertCircle, 
  FiCreditCard,
  FiUser,
  FiCalendar,
  FiDollarSign,
  FiClock
} from "react-icons/fi";
import moment from "moment";
import Modal from "../../components/CustomModal";
import LoadingIndicator from "../../components/common/LoadingIndicator";
import EmptyState from "../../components/common/EmptyState";
import defaultAvatar from "../../assets/default.png";

const DepositRequests = () => {
  const base_url = import.meta.env.VITE_APP_BASE_URL;
  const [deposits, setDeposits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetched, setFetched] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDeposit, setSelectedDeposit] = useState(null);
    const [approving, setApproving] = useState(false);
    const [rejecting, setRejecting] = useState(false);
    const [stats, setStats] = useState(null);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
  
    // Display success message for 5 seconds
    useEffect(() => {
      if (successMessage) {
        const timer = setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
        return () => clearTimeout(timer);
      }
    }, [successMessage]);
  
    const formatDate = (dateString) => {
      return moment(dateString).format("MMM D, YYYY");
    };
  
    const formatDateTime = (dateString) => {
      return moment(dateString).format("MMM D, YYYY h:mm A");
    };
  
    const calculateStats = (depositsData) => {
      const totalDeposits = depositsData.length;
      const pendingDeposits = depositsData.filter(d => d.status === 'pending').length;
  
      // Filter for approved deposit
      const approvedDeposits = depositsData.filter(deposit => deposit.status === 'success');
      const totalAmount = approvedDeposits.reduce((sum, deposit) => sum + deposit.amount, 0);
      
      return {
        totalDeposits,
        totalAmount,
        pendingDeposits
      };
    };
  
    // Update stats whenever deposits change
    useEffect(() => {
      if (deposits.length > 0) {
        setStats(calculateStats(deposits));
      }
    }, [deposits]);
  
    const fetchDeposits = async () => {
      setLoading(true);
      setErrors({});
      try {
        const response = await axios.get('api/v1/transactions/deposits');
        if (response.data?.status === 'success') {
          const depositsData = response.data.data.deposits || [];
          setDeposits(depositsData);
        }
      } catch (error) {
        console.error('Failed to fetch deposits:', error);
        setErrors({ general: 'Failed to fetch deposits. Please try again.' });
      } finally {
        setFetched(true);
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchDeposits();
    }, []);
  
    const handleApprove = async (transactionId) => {
      setApproving(true);
      setErrors({});
      try {
        const response = await axios.patch(`api/v1/transactions/${transactionId}/action/approve?type=deposit`);
        if (response.data.status === 'success') {
          setSuccessMessage("Deposit approved successfully!");
          setDeposits(prev => 
            prev.map(deposit => 
              deposit._id === transactionId ? { 
                ...response.data.data.transaction,
                status: 'approved' // Ensure status is set correctly
              } : deposit
            )
          );
          if (selectedDeposit?._id === transactionId) {
            setSelectedDeposit({ 
              ...selectedDeposit, 
              status: 'approved',
              ...response.data.data.transaction
            });
          }
        }
      } catch (error) {
        if (error.response) {
          if (error.response.data.errors) {
            setErrors(error.response.data.errors);
          } else {
            setErrors({ general: error.response.data.message || 'Failed to approve deposit' });
          }
        } else {
          setErrors({ general: 'Network error. Please try again.' });
        }
        console.error('Deposit approval error:', error);
      } finally {
        setApproving(false);
        setIsModalOpen(false);
      }
    };
  
    const handleReject = async (transactionId) => {
      setRejecting(true);
      setErrors({});
      try {
        const response = await axios.patch(`api/v1/transactions/${transactionId}/action/decline?type=deposit`);
        if (response.data.status === 'success') {
          setSuccessMessage("Deposit rejected successfully!");
          setDeposits(prev => 
            prev.map(deposit => 
              deposit._id === transactionId ? { 
                ...response.data.data.transaction,
                status: 'declined' // Ensure status is set correctly
              } : deposit
            )
          );
          if (selectedDeposit?._id === transactionId) {
            setSelectedDeposit({ 
              ...selectedDeposit, 
              status: 'declined',
              ...response.data.data.transaction
            });
          }
        }
      } catch (error) {
        if (error.response) {
          if (error.response.data.errors) {
            setErrors(error.response.data.errors);
          } else {
            setErrors({ general: error.response.data.message || 'Failed to reject deposit' });
          }
        } else {
          setErrors({ general: 'Network error. Please try again.' });
        }
        console.error('Failed to reject deposit:', error);
      } finally {
        setRejecting(false);
        setIsModalOpen(false);
      }
    };

  const handleExport = () => {
    const csvContent = [
      ['Reference', 'User', 'Amount', 'Type', 'Account', 'Status', 'Date'],
      ...deposits.map(deposit => [
        deposit.reference,
        deposit.cardHolderName,
        `$${deposit.amount}`,
        deposit.depositType,
        deposit.account ? `${deposit.account} - ${deposit.account === 'savings' ? '0526' : '0253'}` : 'N/A',
        deposit.status,
        formatDate(deposit.createdAt)
      ])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `deposits_export_${moment().format('YYYYMMDD')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRefresh = () => {
    setErrors({});
    setSuccessMessage("");
    fetchDeposits();
  };

  const getStatusBadge = (status) => {
    const baseClass = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors";
    switch(status) {
      case 'success':
        return <span className={`${baseClass} bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300`}>Successful</span>;
      case 'pending':
        return <span className={`${baseClass} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300`}>Pending</span>;
      case 'declined':
        return <span className={`${baseClass} bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300`}>Declined</span>;
      default:
        return <span className={`${baseClass} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300`}>{status}</span>;
    }
  };

  const getDepositTypeIcon = (depositType) => {
    const iconMap = {
      'crypto deposit': <FaBitcoin className="text-yellow-500 mr-2" />,
      'card deposit': <FiCreditCard className="text-blue-500 mr-2" />,
      default: <FiCreditCard className="text-gray-500 mr-2" />
    };

    return iconMap[depositType] || iconMap.default;
  };

  const filteredDeposits = deposits.filter(deposit => 
    deposit.cardHolderName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deposit.reference?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && !fetched) {
    return <LoadingIndicator />;
  }

  return (
    <div className="">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-600 overflow-hidden transition-colors">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 dark:border-slate-600">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Deposit Requests</h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 flex items-center">
                <FiAlertCircle className="mr-1.5 text-yellow-500" />
                Review and manage pending deposit requests
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <button
                onClick={handleRefresh}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 transition-colors"
                disabled={loading}
              >
                <FaSyncAlt className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                disabled={deposits.length === 0}
              >
                <FaDownload className="h-5 w-5" /> Export
              </button>
            </div>
          </div>
        </div>

        {/* Error and Success Messages */}
        {errors.general && (
          <div className="mx-6 mt-4 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded transition-colors">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiAlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 dark:text-red-300">{errors.general}</p>
              </div>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="mx-6 mt-4 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded transition-colors">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaCheck className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700 dark:text-green-300">{successMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 border-b border-gray-200 dark:border-slate-600">
            <div className="bg-white dark:bg-slate-700 rounded-xl border border-gray-200 dark:border-slate-600 p-4 hover:shadow-md transition-all">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Deposits</p>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{stats.totalDeposits}</h3>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400">
                  <FiDollarSign className="h-6 w-6" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-700 rounded-xl border border-gray-200 dark:border-slate-600 p-4 hover:shadow-md transition-all">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Amount</p>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">${stats.totalAmount.toLocaleString()}</h3>
                </div>
                <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-500 dark:text-green-400">
                  <FiDollarSign className="h-6 w-6" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-700 rounded-xl border border-gray-200 dark:border-slate-600 p-4 hover:shadow-md transition-all">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Pending Deposits</p>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{stats.pendingDeposits}</h3>
                </div>
                <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-500 dark:text-yellow-400">
                  <FiClock className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-600">
          <div className="relative rounded-lg shadow-sm max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
              placeholder="Search deposit requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-600">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Account
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-600">
              {filteredDeposits.length > 0 ? (
                filteredDeposits.map((deposit, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 dark:bg-slate-600 rounded-full flex items-center justify-center">
                          {deposit.user?.photo ? (
                            <img 
                              src={`${base_url}/${deposit.user.photo}`}  
                              alt={deposit.user.fullname} 
                              className="h-full w-full rounded-full object-cover" 
                            />
                          ) : (
                            <img src={defaultAvatar} className="h-full w-full rounded-full object-cover" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {deposit.user?.fullname || 'N/A'}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {deposit.user?.email || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getDepositTypeIcon(deposit.depositType)}
                        <span className="text-sm text-gray-500 dark:text-gray-400">{deposit.depositType}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{deposit.account || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">${deposit.amount.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{formatDate(deposit.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(deposit.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => {
                            setSelectedDeposit(deposit);
                            setIsModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                          title="View Details"
                        >
                          <FaEye className="h-4 w-4" />
                        </button>

                        {deposit.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(deposit._id)}
                              className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 p-1 rounded hover:bg-green-500/10 dark:hover:bg-green-400/10 transition-colors"
                              disabled={approving}
                            >
                              <FaCheck className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleReject(deposit._id)}
                              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1 rounded hover:bg-red-500/10 dark:hover:bg-red-400/10 transition-colors"
                              disabled={rejecting}
                            >
                              <FaTimes className="h-4 w-4" />
                            </button>
                          </>
                        )}

                        {deposit.status === 'success' && (
                          <button
                            onClick={() => handleReject(deposit._id)}
                            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1 rounded hover:bg-red-500/10 dark:hover:bg-red-400/10 transition-colors"
                            disabled={rejecting}
                          >
                            <FaTimes className="h-4 w-4" />
                          </button>
                        )}

                        {deposit.status === 'declined' && (
                          <button
                            onClick={() => handleApprove(deposit._id)}
                            className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 p-1 rounded hover:bg-green-500/10 dark:hover:bg-green-400/10 transition-colors"
                            disabled={approving}
                          >
                            <FaCheck className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    {fetched ? (
                      <EmptyState 
                        title={searchTerm ? "No matching deposits found" : "No deposit requests available"}
                        description={searchTerm ? "Try a different search term" : "All deposit requests have been processed."}
                        icon={<FiCreditCard className="text-gray-400 dark:text-gray-500 text-4xl" />}
                      />
                    ) : null}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deposit Details Modal */}
      <Modal 
        maxWidth="md"
        show={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Deposit Request Details"
      >
        {selectedDeposit && (
          <div className="space-y-4 p-6">
            {errors.general && (
              <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded transition-colors">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FiAlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700 dark:text-red-300">{errors.general}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Reference</p>
                <p className="font-medium text-gray-900 dark:text-white">{selectedDeposit.reference}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                {getStatusBadge(selectedDeposit.status)}
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Request Date</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {formatDateTime(selectedDeposit.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
                <p className="text-xl font-bold text-gray-800 dark:text-white">
                  ${selectedDeposit.amount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Deposit Type</p>
                <div className="flex items-center">
                  {getDepositTypeIcon(selectedDeposit.depositType)}
                  <span className="font-medium text-gray-900 dark:text-white">
                    {selectedDeposit.depositType}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Account</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {selectedDeposit.account || 'N/A'}
                </p>
              </div>
            </div>

            {/* Payment Method Details */}
            <div className="border-t border-gray-200 dark:border-slate-600 pt-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                {selectedDeposit.depositType === 'crypto deposit' ? 
                  'Crypto Details' : 'Card Details'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedDeposit.depositType === 'crypto deposit' ? (
                  <>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Coin</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {selectedDeposit.coin ? selectedDeposit.coin.toUpperCase() : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Wallet Address</p>
                      <p className="font-medium break-all text-gray-900 dark:text-white">
                        {selectedDeposit.walletAddress || 'N/A'}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Card Type</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {selectedDeposit.cardType || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Card Number</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        **** **** **** {selectedDeposit.cardNumber?.slice(-4) || '****'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Expiry</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {selectedDeposit.cardExpiry || 'N/A'}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* User Details */}
            <div className="border-t border-gray-200 dark:border-slate-600 pt-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">User Details</h3>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 h-12 w-12 bg-gray-200 dark:bg-slate-600 rounded-full flex items-center justify-center">
                  {selectedDeposit.user?.photo ? (
                    <img 
                      src={`${base_url}/${selectedDeposit.user.photo}`}  
                      alt={selectedDeposit.user.fullname} 
                      className="h-full w-full rounded-full object-cover" 
                    />
                  ) : (
                    <FiUser className="text-gray-400 dark:text-gray-500 text-xl" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedDeposit.user?.fullname || 'N/A'}</p>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedDeposit.user?.email || 'N/A'}
                  </div>
                </div>
              </div>
            </div>

            {selectedDeposit.status === 'pending' && (
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-slate-600">
                <button
                  onClick={() => handleReject(selectedDeposit._id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2 transition-colors"
                  disabled={rejecting}
                >
                  {rejecting ? <LoadingIndicator size={4} /> : <FaTimes />} Reject
                </button>
                <button
                  onClick={() => handleApprove(selectedDeposit._id)}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center gap-2 transition-colors"
                  disabled={approving}
                >
                  {approving ? <LoadingIndicator size={4} /> : <FaCheck />} Approve
                </button>
              </div>
            )}

            {selectedDeposit.status === 'success' && (
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-slate-600">
                <button
                  onClick={() => handleReject(selectedDeposit._id)}
                  className="px-4 py-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2 transition-colors"
                  disabled={rejecting}
                >
                  {rejecting ? <LoadingIndicator size={4} /> : <FaTimes />} Decline
                </button>
              </div>
            )}

            {selectedDeposit.status === 'declined' && (
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-slate-600">
                <button
                   onClick={() => handleApprove(selectedDeposit._id)}
                  className="px-4 cursor-pointer py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center gap-2 transition-colors"
                  disabled={approving}
                >
                  {approving ? <LoadingIndicator size={4} /> : <FaCheck />} Approve
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DepositRequests;