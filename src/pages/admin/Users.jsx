import { useState, useEffect } from 'react';
import { 
  FiUsers, 
  FiUserCheck, 
  FiUserX, 
  FiUser, 
  FiDollarSign,
  FiSearch,
  FiFilter,
  FiEye,
  FiTrash2,
  FiGrid,
  FiList,
  FiArrowRight,
  FiClock
} from 'react-icons/fi';
import { 
  FaUserClock, 
  FaUserTimes,
  FaUserCheck
} from 'react-icons/fa';
import { BsWallet2 } from 'react-icons/bs';
import axios from '../../lib/axios';
import SelectField from '../../components/common/SelectField';
import Modal from '../../components/CustomModal';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import EmptyState from '../../components/common/EmptyState';
import UserDetail from './UserDetails';
import FundAccount from './FundAccount';

const base_url = import.meta.env.VITE_APP_BASE_URL;

const Users = () => {
  const [viewMode, setViewMode] = useState('list');
  const [currentScreen, setCurrentScreen] = useState('users_list');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all'
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [stats, setStats] = useState(null);

  // Fetch users and stats data in parallel
  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersResponse, statsResponse] = await Promise.all([
        axios.get('api/v1/users'),
        axios.get('api/v1/stats/admin')
      ]);

      if (usersResponse.data.status === 'success') {
        setUsers(usersResponse.data.data.users);
      }

      if (statsResponse.data.status === 'success') {
        setStats(statsResponse.data.data.stats);
      }

      setFetched(true);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setFetched(true);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters
  useEffect(() => {
    let results = [...users];
    
    if (filters.status !== 'all') {
      results = results.filter(user => user.status === filters.status);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(user => 
        (user.fullname?.toLowerCase().includes(term) || 
         user.email?.toLowerCase().includes(term) ||
         user.phone?.toLowerCase().includes(term))
      );
    }
    
    setFilteredUsers(results);
  }, [filters, searchTerm, users]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (userId, newStatus) => {
    setLoading(true);
    try {
      const response = await axios.patch(`api/v1/users/${userId}/status`, {
        status: newStatus
      });
      
      if (response.data.status === 'success') {
        await fetchData();
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    setLoading(true);
    try {
      await axios.delete(`api/v1/users/${userId}`);
      await fetchData();
      if (selectedUser?._id === userId) {
        setSelectedUser(null);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserInList = (user, action = "update") => {
    if (action === "delete") {
        setUsers(prev => prev.filter(u => u._id !== user._id));
    } else {
        setUsers(prev => prev.map(u => u._id === user._id ? user : u));
    }
  };

  // Status badge component with dark mode support
  const statusBadge = (status) => {
    const baseClass = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors";
    switch(status) {
      case 'active':
        return (
          <span className={`${baseClass} bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300`}>
            <FaUserCheck className="h-4 w-4 mr-1" /> Active
          </span>
        );
      case 'pending':
        return (
          <span className={`${baseClass} bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300`}>
            <FaUserClock className="h-4 w-4 mr-1" /> Pending
          </span>
        );
      case 'deactivated':
        return (
          <span className={`${baseClass} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300`}>
            <FaUserTimes className="h-4 w-4 mr-1" /> Deactivated
          </span>
        );
      default:
        return (
          <span className={`${baseClass} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300`}>
            Unknown
          </span>
        );
    }
  };

  if (currentScreen === 'fund_user') {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 transition-colors">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <FiDollarSign className="text-primary-2" /> Fund User Account
          </h2>
          <button 
            onClick={() => setCurrentScreen('users_list')}
            className="flex items-center text-primary-2 hover:underline cursor-pointer dark:text-primary-400"
          >
            <FiArrowRight className="transform rotate-180 mr-2" /> Back to Users
          </button>
        </div>
        <FundAccount 
          user={selectedUser} 
          onBack={() => setCurrentScreen('users_list')} 
          onComplete={(user) => {
            setSelectedUser(user);
            updateUserInList(user);
          }}
        />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 transition-colors">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <FiUsers className="text-primary-2" /> User Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage all registered users and their accounts
          </p>
        </div>
        
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <button 
            onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 transition-colors"
            aria-label={`Switch to ${viewMode === 'list' ? 'grid' : 'list'} view`}
          >
            {viewMode === 'list' ? <FiGrid /> : <FiList />}
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4 mb-6 transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-2 focus:border-primary-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <SelectField
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'active', label: 'Active' },
              { value: 'pending', label: 'Pending' },
              { value: 'deactivated', label: 'Deactivated' }
            ]}
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            icon={<FiFilter />}
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
            variant="outline"
          />
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Total Users" 
            value={stats.total_users?.toLocaleString() || '0'} 
            icon={<FiUsers className="text-primary-2" />}
            color="primary-2"
          />
          <StatCard 
            title="Active Users" 
            value={stats.total_active_users?.toLocaleString() || '0'} 
            icon={<FiUserCheck className="text-green-500" />}
            color="green-500"
          />
          <StatCard 
            title="Pending Users" 
            value={stats.total_pending_users?.toLocaleString() || '0'} 
            icon={<FiClock className="text-yellow-500" />}
            color="yellow-500"
          />
          <StatCard 
            title="Total Balance" 
            value={`$${stats.total_balance?.toLocaleString() || '0'}`} 
            icon={<BsWallet2 className="text-purple-500" />}
            color="purple-500"
          />
        </div>
      )}

      {/* Content */}
      {loading && !fetched ? (
        <div className="flex justify-center py-12">
          <LoadingIndicator type="dots" size={10} />
        </div>
      ) : fetched && filteredUsers.length === 0 ? (
        <EmptyState 
          title={searchTerm || filters.status !== 'all' ? "No matching users found" : "No users available"}
          description={searchTerm || filters.status !== 'all' 
            ? "Try adjusting your search or filter criteria" 
            : "There are currently no users in the system"}
          icon={<FiUser className="text-gray-400 dark:text-gray-500 text-4xl" />}
          action={
            <button
              onClick={fetchData}
              className="mt-4 px-4 py-2 bg-primary-2 text-white rounded-lg hover:bg-primary-2/90 transition-colors"
            >
              Refresh Data
            </button>
          }
        />
      ) : viewMode === 'list' ? (
        <UserListView 
          users={filteredUsers} 
          onView={(user) => {
            setSelectedUser(user);
            setIsModalOpen(true);
          }}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteUser}
          loading={loading}
          statusBadge={statusBadge}
        />
      ) : (
        <UserGridView 
          users={filteredUsers}
          onView={(user) => {
            setSelectedUser(user);
            setIsModalOpen(true);
          }}
          statusBadge={statusBadge}
          onFund={(user) => {
            setSelectedUser(user);
            setCurrentScreen('fund_user');
          }}
        />
      )}

      {/* User Detail Modal */}
      <Modal 
        onClose={() => setIsModalOpen(false)}
        title="User Details"
        show={isModalOpen} 
        maxWidth="md"
      >
        {selectedUser && (
          <UserDetail 
            user={selectedUser}
            onStatusChange={handleStatusChange}
            onClose={() => setIsModalOpen(false)}
            statusBadge={statusBadge}
            onDelete={handleDeleteUser}
            onFund={() => {
              setCurrentScreen('fund_user');
              setIsModalOpen(false);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

// Stat Card Component with dark mode
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white dark:bg-slate-700 rounded-xl border border-gray-200 dark:border-slate-600 p-4 hover:shadow-md transition-all">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg bg-${color}/10 text-${color} dark:bg-${color}/20`}>
        {icon}
      </div>
    </div>
  </div>
);

// User List View Component with dark mode
const UserListView = ({ users, onView, onStatusChange, onDelete, loading, statusBadge }) => (
  <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-slate-600">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-600">
      <thead className="bg-gray-50 dark:bg-slate-700">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Saving</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Checking</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Joined</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-600">
        {users.map(user => (
          <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 bg-gray-200 dark:bg-slate-600 rounded-full flex items-center justify-center">
                  {user.photo ? (
                    <img src={`${base_url}/${user.photo}`} alt={user.fullname} className="h-full w-full rounded-full object-cover" />
                  ) : (
                    <FiUser className="text-gray-400 dark:text-gray-500" />
                  )}
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{user.fullname || 'N/A'}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{user.email || 'N/A'}</div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {statusBadge(user.status)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
              {user?.wallet[0]?.currency}
              {user?.wallet[0]?.saving?.toLocaleString('en-US')}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
              {user?.wallet[0]?.currency}
              {user?.wallet[0]?.checking?.toLocaleString('en-US')}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div className="flex justify-end space-x-2">
                <button 
                  onClick={() => onView(user)}
                  className="text-primary-2 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 p-1 rounded hover:bg-primary-2/10 dark:hover:bg-primary-400/10 transition-colors"
                >
                  <FiEye />
                </button>
                {user.status === 'active' ? (
                  <button
                    onClick={() => onStatusChange(user._id, 'deactivate')}
                    className="text-yellow-500 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 p-1 rounded hover:bg-yellow-500/10 dark:hover:bg-yellow-400/10 transition-colors"
                    disabled={loading}
                  >
                    <FiUserX />
                  </button>
                ) : (
                  <button
                    onClick={() => onStatusChange(user._id, 'approve')}
                    className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 p-1 rounded hover:bg-green-500/10 dark:hover:bg-green-400/10 transition-colors"
                    disabled={loading}
                  >
                    <FiUserCheck />
                  </button>
                )}
                <button
                  onClick={() => onDelete(user._id)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1 rounded hover:bg-red-500/10 dark:hover:bg-red-400/10 transition-colors"
                  disabled={loading}
                >
                  <FiTrash2 />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// User Grid View Component with dark mode
const UserGridView = ({ users, onView, onFund, statusBadge }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {users.map(user => (
      <div key={user._id} className="bg-white dark:bg-slate-700 rounded-xl border border-gray-200 dark:border-slate-600 overflow-hidden hover:shadow-md transition-all">
        <div className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 h-12 w-12 bg-gray-200 dark:bg-slate-600 rounded-full flex items-center justify-center">
              {user.photo ? (
                <img src={`${base_url}/${user.photo}`} alt={user.fullname} className="h-full w-full rounded-full object-cover" />
              ) : (
                <FiUser className="text-gray-400 dark:text-gray-500 text-xl" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{user.fullname || 'N/A'}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.email || 'N/A'}</p>
              <div className="mt-1">
                {statusBadge(user.status)}
              </div>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Saving</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {user?.wallet[0]?.currency}
                {user?.wallet[0]?.saving?.toLocaleString('en-US')}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Checking</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {user?.wallet[0]?.currency}
                {user?.wallet[0]?.checking?.toLocaleString('en-US')}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Date Join</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
          
          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => onView(user)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-slate-600 dark:hover:bg-slate-500 text-gray-800 dark:text-gray-200 py-2 rounded-lg text-sm flex items-center justify-center transition-colors"
            >
              <FiEye className="mr-1" /> View
            </button>
            <button
              onClick={() => onFund(user)}
              className="flex-1 bg-primary-2 hover:bg-primary-600 text-white py-2 rounded-lg text-sm flex items-center justify-center transition-colors"
            >
              <FiDollarSign className="mr-1" /> Fund
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default Users;