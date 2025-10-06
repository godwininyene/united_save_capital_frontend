import { useState } from "react";
import { FaUserCog, FaLock, FaBell, FaCog, FaMoneyCheckAlt } from "react-icons/fa";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    transactionLimit: 5000,
    loanInterestRate: 5,
    enableNotifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 transition-colors">Admin Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Transaction Settings */}
        <div className="bg-white dark:bg-slate-800 p-6 shadow-md rounded-lg border border-gray-200 dark:border-slate-600 transition-colors">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 text-gray-800 dark:text-white">
            <FaCog className="text-blue-500" /> Transaction Settings
          </h2>
          <label className="block mb-4">
            <span className="text-gray-700 dark:text-gray-300 block mb-2 font-medium">Transaction Limit ($)</span>
            <input
              type="number"
              name="transactionLimit"
              value={settings.transactionLimit}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              min="0"
              step="100"
            />
          </label>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Maximum amount allowed per transaction
          </p>
        </div>

        {/* Loan Settings */}
        <div className="bg-white dark:bg-slate-800 p-6 shadow-md rounded-lg border border-gray-200 dark:border-slate-600 transition-colors">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 text-gray-800 dark:text-white">
            <FaMoneyCheckAlt className="text-green-500" /> Loan Settings
          </h2>
          <label className="block mb-4">
            <span className="text-gray-700 dark:text-gray-300 block mb-2 font-medium">Loan Interest Rate (%)</span>
            <input
              type="number"
              name="loanInterestRate"
              value={settings.loanInterestRate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              min="0"
              max="100"
              step="0.1"
            />
          </label>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Annual interest rate for all loans
          </p>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-slate-800 p-6 shadow-md rounded-lg border border-gray-200 dark:border-slate-600 transition-colors">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 text-gray-800 dark:text-white">
            <FaBell className="text-yellow-500" /> Notification Settings
          </h2>
          <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors cursor-pointer">
            <input
              type="checkbox"
              name="enableNotifications"
              checked={settings.enableNotifications}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="text-gray-700 dark:text-gray-300 font-medium">Enable Email Notifications</span>
          </label>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Receive email alerts for important system events
          </p>
        </div>

        {/* Security Settings */}
        <div className="bg-white dark:bg-slate-800 p-6 shadow-md rounded-lg border border-gray-200 dark:border-slate-600 transition-colors">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 text-gray-800 dark:text-white">
            <FaLock className="text-red-500" /> Security Settings
          </h2>
          <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors cursor-pointer">
            <input
              type="checkbox"
              name="twoFactorAuth"
              checked={settings.twoFactorAuth}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="text-gray-700 dark:text-gray-300 font-medium">Enable Two-Factor Authentication</span>
          </label>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Add an extra layer of security to your account
          </p>
        </div>

        {/* User Management Settings */}
        <div className="bg-white dark:bg-slate-800 p-6 shadow-md rounded-lg border border-gray-200 dark:border-slate-600 transition-colors">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 text-gray-800 dark:text-white">
            <FaUserCog className="text-purple-500" /> User Management
          </h2>
          <label className="block mb-4">
            <span className="text-gray-700 dark:text-gray-300 block mb-2 font-medium">Auto-lock Inactive Accounts (days)</span>
            <input
              type="number"
              name="autoLockDays"
              value={settings.autoLockDays || 30}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              min="1"
              max="365"
            />
          </label>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Automatically lock accounts after period of inactivity
          </p>
        </div>

        {/* System Settings */}
        <div className="bg-white dark:bg-slate-800 p-6 shadow-md rounded-lg border border-gray-200 dark:border-slate-600 transition-colors">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 text-gray-800 dark:text-white">
            <FaCog className="text-gray-500" /> System Settings
          </h2>
          <label className="block mb-4">
            <span className="text-gray-700 dark:text-gray-300 block mb-2 font-medium">Session Timeout (minutes)</span>
            <input
              type="number"
              name="sessionTimeout"
              value={settings.sessionTimeout || 60}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
              min="5"
              max="480"
            />
          </label>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Automatic logout after specified minutes of inactivity
          </p>
        </div>
      </div>

      {/* Save Settings Button */}
      <div className="mt-8 flex justify-end">
        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;