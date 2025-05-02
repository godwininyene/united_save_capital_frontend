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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Transaction Settings */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <FaCog /> Transaction Settings
          </h2>
          <label className="block mb-3">
            <span className="text-gray-700">Transaction Limit ($)</span>
            <input
              type="number"
              name="transactionLimit"
              value={settings.transactionLimit}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </label>
        </div>

        {/* Loan Settings */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <FaMoneyCheckAlt /> Loan Settings
          </h2>
          <label className="block mb-3">
            <span className="text-gray-700">Loan Interest Rate (%)</span>
            <input
              type="number"
              name="loanInterestRate"
              value={settings.loanInterestRate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </label>
        </div>

        {/* Notification Settings */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <FaBell /> Notification Settings
          </h2>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="enableNotifications"
              checked={settings.enableNotifications}
              onChange={handleChange}
            />
            <span className="text-gray-700">Enable Email Notifications</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
