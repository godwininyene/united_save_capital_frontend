import { useState, useEffect } from "react";
import axios from "../../lib/axios";
import { 
  FiCreditCard, 
  FiInfo, 
  FiDollarSign, 
  FiCalendar, 
  FiEdit2,
  FiClock,
  FiCheckCircle,
  FiXCircle
} from "react-icons/fi";
import { FaHistory } from "react-icons/fa";
import InputField from "../../components/common/InputField";
import SelectField from "../../components/common/SelectField";

const LoanManagement = () => {
  const [activeTab, setActiveTab] = useState("request");
  const [errors, setErrors] = useState({});
  const [loanHistory, setLoanHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // Consolidated form state
  const [formData, setFormData] = useState({
    amount: "",
    duration: "",
    purpose: "",
    repaymentPlan: "monthly",
    interestRate: 5, // Default interest rate
    totalPayable: 0,
    monthlyPayment: 0
  });

  // Handle input changes
  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [field]: value
    });

    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const [preview, setPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const repaymentOptions = [
    { value: "monthly", label: "Monthly" },
    { value: "biweekly", label: "Biweekly" },
    { value: "weekly", label: "Weekly" }
  ];

  // Calculate loan details when amount or duration changes
  useEffect(() => {
    if (formData.amount && formData.duration) {
      const amount = parseFloat(formData.amount);
      const duration = parseInt(formData.duration);
      const calculatedInterest = (amount * formData.interestRate) / 100;
      const totalPayable = amount + calculatedInterest;
      const monthlyPayment = totalPayable / duration;

      setFormData(prev => ({
        ...prev,
        totalPayable,
        monthlyPayment: monthlyPayment.toFixed(2)
      }));
    }
  }, [formData.amount, formData.duration, formData.interestRate]);

  // Fetch loan history when tab changes to history
  useEffect(() => {
    if (activeTab === "history" && loanHistory.length === 0) {
      fetchLoanHistory();
    }
  }, [activeTab]);

  const fetchLoanHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const response = await axios.get('api/v1/users/me/loans');
      if (response.data.status === 'success') {
        setLoanHistory(response.data.data.loans);
      } else {
        setErrors({ general: 'Failed to load loan history' });
      }
    } catch (err) {
      setErrors({ general: err.response?.data?.message || 'Failed to load loan history' });
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors = {};
    if (!formData.amount || formData.amount <= 0) newErrors.amount = 'Please enter a valid amount';
    if (!formData.duration || formData.duration <= 0) newErrors.duration = 'Please enter a valid duration';
    if (!formData.purpose) newErrors.purpose = 'Please enter loan purpose';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setPreview(true);
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setErrors({});
    
    try {
      const response = await axios.post('api/v1/users/me/loans', {
        amount: parseFloat(formData.amount),
        duration: parseInt(formData.duration),
        purpose: formData.purpose,
        repaymentPlan: formData.repaymentPlan,
        interestRate: formData.interestRate,
        totalPayable: formData.totalPayable,
        monthlyPayment: formData.monthlyPayment
      });
      
      if (response.data.status === 'success') {
        setSuccessMessage("Your loan request has been submitted successfully!");
        setPreview(false);
        // Reset form
        setFormData({
          amount: "",
          duration: "",
          purpose: "",
          repaymentPlan: "monthly",
          interestRate: 5,
          totalPayable: 0,
          monthlyPayment: 0
        });
        // Refresh loan history
        await fetchLoanHistory();
      } else {
        setErrors(response.data.errors || { general: 'Loan request failed' });
      }
    } catch (err) {
      if (err.response) {
        if (err.response.data.errors) {
          setErrors(err.response.data.errors);
        } else {
          setErrors({ general: err.response.data.message || 'Loan request failed' });
        }
      } else {
        setErrors({ general: 'Network error. Please try again.' });
      }
      console.error('Loan request error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "approved":
        return <FiCheckCircle className="text-green-500" />;
      case "pending":
        return <FiClock className="text-yellow-500" />;
      case "rejected":
        return <FiXCircle className="text-red-500" />;
      default:
        return <FiClock className="text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="">
      <div className="flex flex-col">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab("request")}
              className={`px-6 py-4 font-medium text-sm flex cursor-pointer items-center gap-2 ${
                activeTab === "request" 
                  ? "text-primary-2 border-b-2 border-primary-2" 
                  : "text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300"
              }`}
            >
              <FiCreditCard />
              Request Loan
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-6 py-4 font-medium text-sm cursor-pointer flex items-center gap-2 ${
                activeTab === "history" 
                  ? "text-primary-2 border-b-2 border-primary-2" 
                  : "text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300"
              }`}
            >
              <FaHistory />
              Loan History
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "request" ? (
              <>
                <h1 className="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-2">Request Loan</h1>
                <p className="text-gray-600 dark:text-slate-400 mb-6 flex items-center gap-1">
                  <FiInfo className="text-primary-2" /> Fill out the form below to request a loan
                </p>

                {successMessage && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 text-green-700 dark:text-green-400 p-4 rounded-lg mb-6">
                    <div className="flex items-center gap-2">
                      <FiCheckCircle className="text-lg" />
                      <p>{successMessage}</p>
                    </div>
                  </div>
                )}

                {!preview ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Loan Amount & Duration */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField
                        label="Loan Amount (USD)"
                        type="number"
                        value={formData.amount}
                        onChange={handleInputChange('amount')}
                        variant="outline"
                        placeholder="Enter amount"
                        icon={<FiDollarSign className="text-gray-400 dark:text-slate-400" />}
                        error={errors.amount}
                        min="1"
                      />
                     
                      <InputField
                        label="Duration (Months)"
                        type="number"
                        value={formData.duration}
                        onChange={handleInputChange('duration')}
                        variant="outline"
                        placeholder="Enter duration"
                        icon={<FiCalendar className="text-gray-400 dark:text-slate-400" />}
                        error={errors.duration}
                        min="1"
                      />
                    </div>

                    {/* Repayment Plan */}
                    <SelectField
                      label="Repayment Plan"
                      options={repaymentOptions}
                      value={formData.repaymentPlan}
                      onChange={handleInputChange('repaymentPlan')}
                      variant="outline"
                    />
                    
                    {/* Purpose */}
                    <InputField
                      label="Purpose"
                      value={formData.purpose}
                      onChange={handleInputChange('purpose')}
                      variant="outline"
                      placeholder="Explain the reason for the loan"
                      error={errors.purpose}
                    />
                    
                    {/* Error message at bottom for better visibility before submit button */}
                    {errors.general && (
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FiInfo className="text-lg flex-shrink-0" />
                          <p className="font-medium">{errors.general}</p>
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full cursor-pointer flex items-center justify-center gap-2 px-5 py-3 bg-primary-2 text-white font-medium rounded-lg shadow-md transition-all hover:brightness-110 hover:scale-[1.02]"
                    >
                      <FiCreditCard className="text-lg" /> Request Loan
                    </button>
                  </form>
                ) : (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-100 mb-4">Loan Request Summary</h2>

                    {/* Error message at top for preview step */}
                    {errors.general && (
                      <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FiInfo className="text-lg flex-shrink-0" />
                          <p className="font-medium">{errors.general}</p>
                        </div>
                      </div>
                    )}

                    {/* Loan Details Card */}
                    <div className="bg-primary-2/5 dark:bg-blue-900/20 p-4 rounded-lg border border-primary-2/20 dark:border-blue-800/30 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-slate-400">Loan Amount</p>
                          <p className="font-bold text-gray-800 dark:text-slate-100">${formData.amount}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-slate-400">Duration</p>
                          <p className="font-bold text-gray-800 dark:text-slate-100">{formData.duration} months</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-slate-400">Interest Rate</p>
                          <p className="font-bold text-gray-800 dark:text-slate-100">{formData.interestRate}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-slate-400">Monthly Payment</p>
                          <p className="font-bold text-gray-800 dark:text-slate-100">${formData.monthlyPayment}</p>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 dark:border-slate-600 pt-3">
                        <p className="text-sm text-gray-600 dark:text-slate-400">Total Payable</p>
                        <p className="font-bold text-primary-2 text-xl">${formData.totalPayable.toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-slate-400">Repayment Plan</p>
                        <p className="font-medium text-gray-800 dark:text-slate-100 capitalize">{formData.repaymentPlan}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-slate-400">Purpose</p>
                        <p className="font-medium text-gray-800 dark:text-slate-100">{formData.purpose || "N/A"}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-4 pt-4">
                      {/* Error message at bottom for preview step */}
                      {errors.general && (
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 rounded-lg">
                          <div className="flex items-center gap-2">
                            <FiInfo className="text-lg flex-shrink-0" />
                            <p className="font-medium">{errors.general}</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex gap-3">
                        <button
                          onClick={() => setPreview(false)}
                          className="flex items-center cursor-pointer justify-center gap-2 w-full px-5 py-3 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-300 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
                        >
                          <FiEdit2 /> Edit Details
                        </button>
                        <button
                          onClick={handleConfirm}
                          className={`w-full cursor-pointer px-5 py-3 text-white font-medium rounded-lg shadow-md transition-all ${
                            isSubmitting 
                              ? "bg-gray-400 dark:bg-slate-600 cursor-not-allowed" 
                              : "bg-primary-2 hover:brightness-110"
                          }`}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Processing..." : "Confirm Request"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <h1 className="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-2">Loan History</h1>
                <p className="text-gray-600 dark:text-slate-400 mb-6 flex items-center gap-1">
                  <FiInfo className="text-primary-2" /> View your past and current loan applications
                </p>

                {errors.general && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FiInfo className="text-lg flex-shrink-0" />
                      <p className="font-medium">{errors.general}</p>
                    </div>
                  </div>
                )}

                {isLoadingHistory ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-2"></div>
                  </div>
                ) : loanHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <FaHistory className="mx-auto text-gray-400 dark:text-slate-500 text-3xl mb-3" />
                    <h3 className="text-lg font-medium text-gray-700 dark:text-slate-300">No loan history found</h3>
                    <p className="text-gray-500 dark:text-slate-400 mt-1">You haven't applied for any loans yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200 dark:divide-slate-700">
                    {loanHistory.map((loan) => (
                      <div key={loan.id} className="py-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-gray-800 dark:text-slate-100">${loan.amount.toLocaleString('en-US')}</span>
                              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300">
                                {loan.duration} months
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-slate-400">{loan.purpose}</p>
                            <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">
                              Applied on {formatDate(loan.createdAt)} • {loan.repaymentPlan}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(loan.status)}
                            <span className={`text-sm capitalize ${
                              loan.status === 'approved' ? 'text-green-600 dark:text-green-400' :
                              loan.status === 'pending' ? 'text-yellow-600 dark:text-yellow-400' :
                              'text-red-600 dark:text-red-400'
                            }`}>
                              {loan.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanManagement;