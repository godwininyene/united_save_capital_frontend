import { useState, useEffect } from 'react';
import { 
  FiDollarSign, 
  FiSearch,
  FiFilter,
  FiEye,
  FiCheck,
  FiX,
  FiDownload,
  FiUser,
  FiCalendar,
  FiRefreshCw,
  FiClock,
  FiPercent
} from 'react-icons/fi';
import { BsCashCoin } from 'react-icons/bs';
import moment from 'moment';
import Modal from '../../components/CustomModal';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import EmptyState from '../../components/common/EmptyState';
import SelectField from '../../components/common/SelectField';
import axios from '../../lib/axios';
import defaultAvatar from '../../assets/default.png';

const ManageLoans = () => {
  const base_url = import.meta.env.VITE_APP_BASE_URL;
  const [loans, setLoans] = useState([]);
  const [stats, setStats] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [approving, setApproving] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    repaymentPlan: 'all',
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

  // Calculate derived stats from loans data
  const calculateDerivedStats = (loansData) => {
    const totalLoans = loansData.length;
    const totalPending = loansData.filter(loan => loan.status === 'pending').length;
  
    // Filter for approved loans
    const approvedLoans = loansData.filter(loan => loan.status === 'approved');
  
    const totalAmount = approvedLoans.reduce((sum, loan) => sum + loan.amount, 0);
    const totalPayable = approvedLoans.reduce((sum, loan) => sum + (loan.totalPayable || 0), 0);
  
    return {
      total_loans: totalLoans,
      total_loan_amount: totalAmount,
      total_pending_loans: totalPending,
      total_payable_amount: totalPayable
    };
  };
  

  // Fetch loans data
  const fetchData = async () => {
    setLoading(true);
    setErrors({});
    try {
      const loansResponse = await axios.get('api/v1/loans');
     
      if (loansResponse.data?.status === 'success') {
        const loansData = loansResponse.data.data.loans || [];
        setLoans(loansData);
        setFilteredLoans(loansData);
        setStats(calculateDerivedStats(loansData));
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setErrors({ general: 'Failed to fetch loans. Please try again.' });
    } finally {
      setFetched(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Apply filters
  useEffect(() => {
    if (!fetched) return;
    
    let results = [...loans];
    
    if (filters.status !== 'all') {
      results = results.filter(loan => loan.status === filters.status);
    }
    
    if (filters.repaymentPlan !== 'all') {
      results = results.filter(loan => loan.repaymentPlan === filters.repaymentPlan);
    }
    
    if (filters.dateRange !== 'all') {
      const now = moment();
      results = results.filter(loan => {
        const loanDate = moment(loan.createdAt);
        switch(filters.dateRange) {
          case 'today':
            return loanDate.isSame(now, 'day');
          case 'week':
            return loanDate.isSame(now, 'week');
          case 'month':
            return loanDate.isSame(now, 'month');
          default:
            return true;
        }
      });
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(loan => 
        loan._id?.toLowerCase().includes(term) || 
        loan.user?.fullname?.toLowerCase().includes(term) ||
        loan.amount?.toString().includes(term) ||
        loan.purpose?.toLowerCase().includes(term)
      );
    }
    
    setFilteredLoans(results);
    setStats(calculateDerivedStats(results));
  }, [filters, searchTerm, loans, fetched]);

  const handleApprove = async (loanId) => {
    setApproving(true);
    setErrors({});
    try {
      const response = await axios.patch(`api/v1/loans/${loanId}/action/approve`);
      if (response.data.status === 'success') {
        setSuccessMessage('Loan approved successfully!');
        setLoans(prev => 
          prev.map(loan => 
            loan._id === loanId ? { 
              ...loan, 
              status: 'approved',
              approvedAt: new Date().toISOString(),
              ...response.data.data.loan // Include any additional updated fields from the response
            } : loan
          )
        );
        if (selectedLoan?._id === loanId) {
          setSelectedLoan({ 
            ...selectedLoan, 
            status: 'approved',
            approvedAt: new Date().toISOString(),
            ...response.data.data.loan
          });
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setErrors({ general: error.response.data.message || 'Failed to approve loan' });
        }
      } else {
        setErrors({ general: 'Network error. Please try again.' });
      }
      console.error('Failed to approve loan:', error);
    } finally {
      setApproving(false);
      setIsModalOpen(false);
    }
  };

  const handleReject = async (loanId) => {
    setRejecting(true);
    setErrors({});
    try {
      const response = await axios.patch(`api/v1/loans/${loanId}/action/reject`);
      if (response.data.status === 'success') {
        setSuccessMessage('Loan rejected successfully!');
        setLoans(prev => 
          prev.map(loan => 
            loan._id === loanId ? { 
              ...loan, 
              status: 'rejected',
              ...response.data.data.loan // Include any additional updated fields from the response
            } : loan
          )
        );
        if (selectedLoan?._id === loanId) {
          setSelectedLoan({ 
            ...selectedLoan, 
            status: 'rejected',
            ...response.data.data.loan
          });
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setErrors({ general: error.response.data.message || 'Failed to reject loan' });
        }
      } else {
        setErrors({ general: 'Network error. Please try again.' });
      }
      console.error('Failed to reject loan:', error);
    } finally {
      setRejecting(false);
      setIsModalOpen(false);
    }
  };

  const handleExport = () => {
    // Implement export functionality
    const csvContent = [
      ['Loan ID', 'User', 'Amount', 'Total Payable', 'Duration', 'Repayment Plan', 'Status', 'Date'],
      ...filteredLoans.map(loan => [
        loan._id.slice(-8),
        loan.user?.fullname || 'N/A',
        `$${loan.amount}`,
        `$${loan.totalPayable}`,
        `${loan.duration} months`,
        loan.repaymentPlan,
        loan.status,
        moment(loan.createdAt).format('MMM D, YYYY')
      ])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `loans_export_${moment().format('YYYYMMDD')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRefresh = () => {
    setErrors({});
    setSuccessMessage("");
    fetchData();
  };

  const StatusBadge = ({ status }) => {
    const baseClass = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch(status) {
      case 'approved':
        return <span className={`${baseClass} bg-green-100 text-green-800`}>Approved</span>;
      case 'pending':
        return <span className={`${baseClass} bg-yellow-100 text-yellow-800`}>Pending</span>;
      case 'rejected':
        return <span className={`${baseClass} bg-red-100 text-red-800`}>Rejected</span>;
      default:
        return <span className={`${baseClass} bg-gray-100 text-gray-800`}>{status}</span>;
    }
  };

  const RepaymentPlanBadge = ({ plan }) => {
    const baseClass = "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium";
    switch(plan) {
      case 'weekly':
        return <span className={`${baseClass} bg-blue-50 text-blue-700`}>Weekly</span>;
      case 'bi-weekly':
        return <span className={`${baseClass} bg-green-50 text-green-700`}>Bi-Weekly</span>;
      case 'monthly':
        return <span className={`${baseClass} bg-purple-50 text-purple-700`}>Monthly</span>;
      default:
        return <span className={`${baseClass} bg-gray-50 text-gray-700`}>{plan}</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <BsCashCoin className="text-primary-2" /> Loan Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            View and manage all loan applications
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
            disabled={filteredLoans.length === 0}
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
              placeholder="Search loans..."
              className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-2 focus:border-primary-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <SelectField
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'pending', label: 'Pending' },
              { value: 'approved', label: 'Approved' },
              { value: 'rejected', label: 'Rejected' }
            ]}
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            icon={<FiFilter />}
            variant="outline"
          />
          
          <SelectField
            options={[
              { value: 'all', label: 'All Repayment Plans' },
              { value: 'weekly', label: 'Weekly' },
              { value: 'bi-weekly', label: 'Bi-Weekly' },
              { value: 'monthly', label: 'Monthly' }
            ]}
            value={filters.repaymentPlan}
            onChange={(e) => setFilters({...filters, repaymentPlan: e.target.value})}
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
            title="Total Loans" 
            value={stats.total_loans || 0} 
            icon={<BsCashCoin className="text-primary-2" />}
            color="primary-2"
          />
          <StatCard 
            title="Total Amount" 
            value={`$${(stats.total_loan_amount || 0).toLocaleString()}`} 
            icon={<FiDollarSign className="text-blue-500" />}
            color="blue-500"
          />
          <StatCard 
            title="Pending Loans" 
            value={stats.total_pending_loans || 0} 
            icon={<FiClock className="text-yellow-500" />}
            color="yellow-500"
          />
          <StatCard 
            title="Total Payable" 
            value={`$${(stats.total_payable_amount || 0).toLocaleString()}`} 
            icon={<FiDollarSign className="text-green-500" />}
            color="green-500"
          />
        </div>
      )}

      {/* Loans Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Payable</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {!fetched ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center">
                  <LoadingIndicator type="dots" size={8} />
                </td>
              </tr>
            ) : filteredLoans.length > 0 ? (
              filteredLoans.map(loan => (
                <tr key={loan._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {loan._id.slice(-8)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {moment(loan.createdAt).format('MMM D, YYYY')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        {loan.user?.photo ? (
                          <img 
                            src={`${base_url}/${loan.user.photo}`} 
                            alt={loan.user.fullname} 
                            className="h-full w-full rounded-full object-cover" 
                          />
                        ) : (
                          <img src={defaultAvatar} className="h-full w-full rounded-full object-cover" />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {loan.user?.fullname || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {loan.user?.email || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${loan.amount?.toLocaleString() || '0'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${loan.totalPayable?.toLocaleString() || '0'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {loan.monthlyPayment ? `$${loan.monthlyPayment}/mo` : ''}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <RepaymentPlanBadge plan={loan.repaymentPlan} />
                    <div className="text-sm text-gray-500 mt-1">
                      {loan.duration || '0'} months
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={loan.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => {
                          setSelectedLoan(loan);
                          setIsModalOpen(true);
                        }}
                        className="text-primary-2 cursor-pointer hover:text-primary-600 p-1 rounded hover:bg-primary-2/10"
                      >
                        <FiEye />
                      </button>
                      {loan.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(loan._id)}
                            className="text-green-500 cursor-pointer hover:text-green-700 p-1 rounded hover:bg-green-500/10"
                            disabled={approving}
                          >
                            <FiCheck />
                          </button>
                          <button
                            onClick={() => handleReject(loan._id)}
                            className="text-red-500 cursor-pointer hover:text-red-700 p-1 rounded hover:bg-red-500/10"
                            disabled={rejecting}
                          >
                            <FiX />
                          </button>
                        </>
                      )}

                      {loan.status === 'approved' && (
                        <button
                          onClick={() => handleReject(loan._id)}
                          className="text-red-500 cursor-pointer hover:text-red-700 p-1 rounded hover:bg-red-500/10"
                          disabled={rejecting}
                        >
                          <FiX />
                        </button>
                      )}
                      {loan.status === 'rejected' && (
                        
                        <button
                          onClick={() => handleApprove(loan._id)}
                          className="text-green-500 cursor-pointer hover:text-green-700 p-1 rounded hover:bg-green-500/10"
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
                <td colSpan={7} className="px-6 py-4">
                  <EmptyState 
                    title="No loans found"
                    description="Try adjusting your search or filter criteria"
                    icon={<BsCashCoin className="text-gray-400 text-4xl" />}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Loan Detail Modal */}
      <Modal 
        maxWidth="md"
        show={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Loan Application Details"
      >
        {selectedLoan && (
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Loan ID</p>
                <p className="font-medium">{selectedLoan._id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <StatusBadge status={selectedLoan.status} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Application Date</p>
                <p className="font-medium">
                  {moment(selectedLoan.createdAt).format('MMM D, YYYY h:mm A')}
                </p>
              </div>
              {selectedLoan.approvedAt && (
                <div>
                  <p className="text-sm text-gray-500">Approved Date</p>
                  <p className="font-medium">
                    {moment(selectedLoan.approvedAt).format('MMM D, YYYY h:mm A')}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Loan Amount</p>
                <p className="text-xl font-bold text-gray-800">
                  ${selectedLoan.amount?.toLocaleString() || '0'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Payable</p>
                <p className="text-xl font-bold text-gray-800">
                  ${selectedLoan.totalPayable?.toLocaleString() || '0'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Repayment Plan</p>
                <div className="flex items-center gap-2">
                  <RepaymentPlanBadge plan={selectedLoan.repaymentPlan} />
                  <span className="text-sm text-gray-500">
                    ({selectedLoan.duration || '0'} months)
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Monthly Payment</p>
                <p className="font-medium">
                  ${selectedLoan.monthlyPayment?.toFixed(2) || '0.00'}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Purpose</p>
                <p className="font-medium">{selectedLoan.purpose || 'N/A'}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">User Details</h3>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                  {selectedLoan.user?.photo ? (
                    <img 
                      src={`${base_url}/${selectedLoan.user.photo}`} 
                      alt={selectedLoan.user.fullname} 
                      className="h-full w-full rounded-full object-cover" 
                    />
                  ) : (
                    <FiUser className="text-gray-400 text-xl" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{selectedLoan.user?.fullname || 'N/A'}</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm mt-1">
                    <div>
                      <span className="text-gray-500">Email: </span>
                      <span>{selectedLoan.user?.email || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Phone: </span>
                      <span>{selectedLoan.user?.phone || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {selectedLoan.status === 'pending' && (
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleReject(selectedLoan._id)}
                  className="px-4 py-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2"
                  disabled={rejecting}
                >
                  {rejecting ? <LoadingIndicator size={4} /> : <FiX />} Reject
                </button>
                <button
                  onClick={() => handleApprove(selectedLoan._id)}
                  className="px-4 py-2 cursor-pointer bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center gap-2"
                  disabled={approving}
                >
                  {approving ? <LoadingIndicator size={4} /> : <FiCheck />} Approve
                </button>
              </div>
            )}

            {selectedLoan.status === 'approved' && (
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleReject(selectedLoan._id)}
                  className="px-4 py-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2"
                  disabled={rejecting}
                >
                  {rejecting ? <LoadingIndicator size={4} /> : <FiX />} Reject
                </button>
              </div>
            )}

            {selectedLoan.status === 'rejected' && (
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleApprove(selectedLoan._id)}
                  className="px-4 py-2 cursor-pointer bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center gap-2"
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

export default ManageLoans;