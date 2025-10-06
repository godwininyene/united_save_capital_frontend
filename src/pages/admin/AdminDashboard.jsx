import { 
  FiArrowRight, FiActivity, FiUser, FiDollarSign, FiClock, FiAlertCircle 
} from "react-icons/fi";
import { 
  FaUsers, FaMoneyBillWave, FaHandHoldingUsd, FaMoneyCheckAlt 
} from "react-icons/fa";
import Chart from "react-apexcharts";
import React, { useState, useEffect } from "react";
import axios from "../../lib/axios";
import LoadingIndicator from "../../components/common/LoadingIndicator";
import moment from "moment";

const getStatusBadge = (status) => {
  switch(status?.toLowerCase()) {
    case 'pending':
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400">Pending</span>;
    case 'success':
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">Completed</span>;
    case 'declined':
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400">Declined</span>;
    default:
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-slate-600 text-gray-800 dark:text-slate-300">{status || 'N/A'}</span>;
  }
};

const AdminDashboard = () => {
  // Chart configuration with dark mode support
  const chartOptions = {
    chart: {
      id: "transactions",
      toolbar: { show: false },
      fontFamily: "'Inter', sans-serif",
      background: 'transparent'
    },
    colors: ["#4F46E5"],
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      labels: { 
        style: { 
          colors: '#6B7280' 
        }
      },
      axisBorder: { color: '#E5E7EB' }
    },
    yaxis: { 
      labels: { 
        style: { 
          colors: '#6B7280' 
        }
      }
    },
    grid: { 
      borderColor: '#E5E7EB',
      strokeDashArray: 4
    },
    stroke: { width: 3, curve: "smooth" },
    markers: { size: 5 },
    theme: {
      mode: 'light'
    }
  };

  const chartSeries = [
    { name: "Transactions", data: [30, 40, 35, 50, 49, 60] }
  ];

  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await axios.get('api/v1/stats/admin');
      console.log(res);
      
      setStats(res.data.data.stats);
      setFetched(true);
    } catch (error) {
      console.error("Error fetching stats:", error);
      setFetched(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const formatDate = (dateString) => {
    return moment(dateString).format('MMM D, YYYY');
  };

  if (loading && !fetched) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingIndicator />
      </div>
    );
  }

  if (!stats && fetched) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <FiAlertCircle className="text-4xl text-gray-400 dark:text-slate-500 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100">No data available</h3>
        <p className="text-gray-500 dark:text-slate-400 mt-1">Failed to load dashboard statistics</p>
        <button 
          onClick={fetchStats}
          className="mt-4 px-4 py-2 bg-primary-2 text-white rounded-lg hover:bg-primary-2/90 transition-colors cursor-pointer"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-slate-100">Dashboard Overview</h1>
        <div className="text-sm text-gray-500 dark:text-slate-400">
          Last updated: {moment().format('MMMM D, h:mm A')}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value={stats?.total_users?.toLocaleString('en-US') || '0'}
          change="+12.5%" 
          icon={<FaUsers className="text-primary-2" />}
          color="primary-2"
        />
        <StatCard 
          title="Total Transactions" 
          value={stats?.total_transactions?.toLocaleString('en-US') || '0'} 
          change="+8.2%" 
          icon={<FaMoneyBillWave className="text-green-500" />}
          color="green-500"
        />
        <StatCard 
          title="Total Loans" 
          value={stats?.total_loans?.toLocaleString('en-US') || '0'} 
          change="-3.1%" 
          icon={<FaHandHoldingUsd className="text-yellow-500" />}
          color="yellow-500"
        />
        <StatCard 
          title="Total Deposits" 
          value={`$${stats?.total_deposit?.toLocaleString('en-US') || '0'}`} 
          change="+15.7%" 
          icon={<FaMoneyCheckAlt className="text-purple-500" />}
          color="purple-500"
        />
      </div>

      {/* Charts and Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transaction Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-100 flex items-center gap-2">
              <FiActivity className="text-primary-2" /> Transaction Overview
            </h2>
            <select className="text-sm border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-2/50 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100">
              <option>Last 6 Months</option>
              <option>Last Year</option>
              <option>Last 3 Years</option>
            </select>
          </div>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="line"
            height={300}
          />
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-100 mb-4 flex items-center gap-2">
              <FiUser className="text-primary-2" /> User Activity
            </h2>
            <div className="space-y-4">
              <StatItem 
                label="New Users Today"  
                value={stats?.total_users_today?.toLocaleString('en-US') || '0'}  
              />
              <StatItem 
                label="Active Users" 
                value={stats?.total_active_users?.toLocaleString('en-US') || '0'} 
              />
              <StatItem 
                label="Pending Verifications" 
                value={stats?.total_pending_users?.toLocaleString('en-US') || '0'} 
              />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-100 mb-4 flex items-center gap-2">
              <FiDollarSign className="text-primary-2" /> Financial Snapshot
            </h2>
            <div className="space-y-4">
              <StatItem 
                label="Total Balance" 
                value={`$${stats?.total_balance?.toLocaleString('en-US') || '0'}`} 
              />
              <StatItem 
                label="Pending Transactions" 
                value={stats?.total_pending_transactions?.toLocaleString('en-US') || '0'} 
              />
              <StatItem 
                label="Pending Loans" 
                value={stats?.total_pending_loans?.toLocaleString('en-US') || '0'} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityTable 
          title="Recent Transactions"
          icon={<FiDollarSign />}
          headers={["User", "Amount", "Status", "Date"]}
          data={stats?.latest_transactions?.slice(0, 5).map(tx => [
            tx.user?.fullname || 'N/A',
            `$${tx.amount?.toLocaleString() || '0'}`,
            tx.status,
            formatDate(tx.createdAt)
          ]) || []}
          link="/account/admin/manage_transactions"
          emptyMessage="No recent transactions"
        />

        <ActivityTable 
          title="Recent Users"
          icon={<FiUser />}
          headers={["Name", "Email", "Joined"]}
          data={stats?.latest_users?.slice(0, 5).map(user => [
            user.fullname,
            user.email,
            formatDate(user.createdAt)
          ]) || []}
          link="/account/admin/manage_users"
          emptyMessage="No recent users"
        />

        <ActivityTable 
          title="Pending Loans"
          icon={<FiClock />}
          headers={["User", "Amount", "Requested"]}
          data={stats?.pending_loans?.slice(0, 5).map(loan => [
            loan.user?.fullname || 'N/A',
            `$${loan.amount?.toLocaleString() || '0'}`,
            formatDate(loan.createdAt)
          ]) || []}
          link="/account/admin/manage_loans"
          emptyMessage="No pending loans"
        />
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, change, icon, color }) => {
  const isPositive = change?.startsWith('+');
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-slate-700 hover:shadow-md transition-shadow">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-slate-400">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mt-1">{value}</h3>
        </div>
        <div className={`h-12 w-12 rounded-lg bg-${color}/10 flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      {change && (
        <div className={`mt-4 text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {change} {isPositive ? '↑' : '↓'} <span className="text-gray-500 dark:text-slate-400 ml-1">vs last month</span>
        </div>
      )}
    </div>
  );
};

// Stat Item Component
const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-gray-600 dark:text-slate-400">{label}</span>
    <span className="font-medium text-gray-800 dark:text-slate-100">{value}</span>
  </div>
);

// Activity Table Component
const ActivityTable = ({ title, icon, headers, data, link, emptyMessage = "No data available" }) => (
  <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
    <div className="p-4 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
      <h3 className="font-semibold text-gray-800 dark:text-slate-100 flex items-center gap-2">
        {React.cloneElement(icon, { className: "text-primary-2" })}
        {title}
      </h3>
      <a href={link} className="text-sm text-primary-2 hover:underline flex items-center gap-1 cursor-pointer">
        View all <FiArrowRight />
      </a>
    </div>
    <div className="overflow-x-auto">
      {data.length === 0 ? (
        <div className="text-center py-8">
          <FiAlertCircle className="mx-auto text-gray-400 dark:text-slate-500 text-3xl mb-3" />
          <p className="text-gray-500 dark:text-slate-400">{emptyMessage}</p>
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm font-medium text-gray-500 dark:text-slate-400 border-b border-gray-100 dark:border-slate-700">
              {headers.map((header, i) => (
                <th key={i} className="p-3">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                {row.map((cell, j) => (
                  <td key={j} className="p-3 text-sm text-gray-800 dark:text-slate-200">
                    {j === 2 && headers[j] === "Status" ? (
                      getStatusBadge(cell)
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
);

export default AdminDashboard;