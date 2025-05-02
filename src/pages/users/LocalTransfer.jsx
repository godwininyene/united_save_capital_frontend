import { useState } from "react";
import { FiSend, FiCreditCard, FiDollarSign, FiUser, FiHome, FiLock, FiChevronLeft } from "react-icons/fi";
import { MdCheckCircle } from "react-icons/md";
import { FaPiggyBank, FaUniversity,FaEdit } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import InputField from "../../components/common/InputField";
import SelectField from "../../components/common/SelectField";
import axios from "../../lib/axios";

const LocalTransfer = () => {
  // Consolidated form state
  const [formData, setFormData] = useState({
    amount: "",
    beneficiaryName: "",
    accountNumber: "",
    bankName: "",
    description: "",
    routingNumber: "",
    pin: "",
    selectedAccount: "",
    address:""
  });


  const [preview, setPreview] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [transactionRef, setTransactionRef] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const wallet = JSON.parse(localStorage.getItem("wallet"));

  const accountOptions = [
    {
      value: "saving",
      label: `SAVINGS - ${wallet?.savingAccountNumber}  (${wallet?.currency}${wallet.saving.toLocaleString('en-US')})`
    },
    {
      value: "checking",
      label: `CHECKING - ${wallet?.checkingAccountNumber}  (${wallet?.currency}${wallet?.checking.toLocaleString('en-US')})`
    }
  ];

  // Handle input changes
  const handleInputChange = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (preview) {
      await submitTransaction();
    } else {

      setPreview(true);
    }
  };

  const submitTransaction = async () => {
    setIsSubmitting(true);
    setErrors({});
    
    try {
      const response = await axios.post('api/v1/users/me/transactions', {
        type: 'transfer',
        transferType: 'local transfer',
        amount: parseFloat(formData.amount),
        account: formData.selectedAccount,
        beneficiaryName: formData.beneficiaryName,
        beneficiaryAcct: formData.accountNumber,
        beneficiaryBank: formData.bankName,
        routingNumb: formData.routingNumber,
        pin: formData.pin,
        description: formData.remark
      });
      
      if (response.data.status === 'success') {
        setTransactionRef(response.data.data.transaction.reference);
        setPreview(false);
        setConfirmation(true);
      } else {
        setErrors(response.data.errors || { general: 'Transaction failed' });
      }
    } catch (err) {
      if (err.response) {
        if (err.response.data.errors) {
          setErrors(err.response.data.errors);
        } else {
          setErrors({ general: err.response.data.message || 'Transaction failed' });
        }
      } else {
        setErrors({ general: 'Network error. Please try again.' });
      }
      console.error('Transaction error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setConfirmation(false);
    setFormData({
      amount: "",
      beneficiaryName: "",
      accountNumber: "",
      bankName: "",
      description: "",
      routingNumber: "",
      pin: "",
      selectedAccount: "",
      address:""
    });
    setTransactionRef("");
    setErrors({});
  };

  return (
    <div className="">
      <div className="flex flex-col">
        {/* Local Transfer Section */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">United Save Capital Secure Local Transfer</h2>
          <p className="text-gray-600 mb-6 flex items-center gap-1">
            Transfer Funds to a local Bank
          </p>

          {errors.general && !preview && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg">
              {errors.general}
            </div>
          )}

          {confirmation ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdCheckCircle className="text-green-500 text-5xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Transfer Processed</h2>
              <p className="text-gray-700 max-w-md mx-auto mb-6">
                Your local transfer of £{formData.amount} to {formData.beneficiaryName} has been successfully submitted.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg max-w-md mx-auto mb-6">
                <p className="text-sm text-gray-600">Transaction Reference</p>
                <p className="font-mono text-gray-800">{transactionRef}</p>
              </div>
              {formData.remark && (
                <div className="bg-gray-50 p-4 rounded-lg max-w-md mx-auto mb-6">
                  <p className="text-sm text-gray-600">Remark</p>
                  <p className="text-gray-800">{formData.remark}</p>
                </div>
              )}
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-primary-2 cursor-pointer text-white font-medium rounded-lg shadow-md hover:brightness-110 transition-all"
              >
                New Transfer
              </button>
            </div>
          ) : preview ? (
            <div className="bg-white rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Transfer Summary</h2>
                <div className="bg-blue-50 text-primary-2 px-3 py-1 rounded-full text-sm font-medium">
                  Pending Confirmation
                </div>
              </div>

              {errors.general && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg">
                  {errors.general}
                </div>
              )}

              <div className="space-y-5">
                {/* Summary Card */}
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">From Account</p>
                        <p className="font-medium text-gray-800">
                          {formData.selectedAccount === "savings" 
                            ? "SAVINGS - 0526 (£3,802,500.00)" 
                            : "CHECKING - 0253 (£0.00)"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Beneficiary</p>
                        <p className="font-medium text-gray-800">{formData.beneficiaryName}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Bank Details</p>
                        <p className="font-medium text-gray-800">{formData.bankName}</p>
                        <p className="text-sm text-gray-600">{formData.accountNumber}</p>
                      </div>
                    </div>
                  </div>
                  {formData.description && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-500">Remark</p>
                      <p className="text-gray-800">{formData.description}</p>
                    </div>
                  )}
                </div>

                {/* Amount Breakdown */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100">
                  <h3 className="font-semibold text-gray-700 mb-3">Amount Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transfer Amount</span>
                      <span className="font-medium">£{parseFloat(formData.amount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fee (1%)</span>
                      <span className="font-medium">£{(formData.amount * 0.01).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 my-2"></div>
                    <div className="flex justify-between">
                      <span className="text-gray-800 font-semibold">Total</span>
                      <span className="text-primary-2 font-bold">
                        £{(parseFloat(formData.amount) + (formData.amount * 0.01)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="p-5">
                  <h3 className="font-semibold text-gray-700 mb-3">Transfer Timeline</h3>
                  <div className="flex items-start">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-8 h-8 rounded-full bg-primary-2 flex items-center justify-center">
                        <MdCheckCircle className="text-white text-lg" />
                      </div>
                      <div className="w-0.5 h-12 bg-gray-300"></div>
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="mb-6">
                        <p className="font-medium text-gray-800">Initiated</p>
                        <p className="text-sm text-gray-500">Just now</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Processing</p>
                        <p className="text-sm text-gray-400">Estimated completion: 1 business day</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={() => setPreview(false)}
                    className="flex-1 px-5 py-3 border cursor-pointer border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiChevronLeft /> Edit Details
                  </button>
                  <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 px-5 py-3 bg-primary-2 cursor-pointer text-white font-medium rounded-lg shadow-sm hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Processing...' : 'Confirm Transfer'} <FiSend />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <SelectField
                    label="From"
                    variant="outline"
                    options={accountOptions}
                    value={formData.selectedAccount}
                    onChange={handleInputChange('selectedAccount')}
                    classNames="border-b-2 border-gray-200 py-3 px-0"
                    icon={<FaPiggyBank className="text-gray-400" />}
                    error={errors.account}
                  />
                </div>
                <div>
                  <InputField
                    label="Enter Amount £"
                    type="number"
                    value={formData.amount}
                    onChange={handleInputChange('amount')}
                    variant="outline"
                    classNames="border-b-2 border-gray-200 py-3 px-0"
                    icon={<FiDollarSign className="text-gray-400" />}
                    error={errors.amount}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InputField
                    label="Beneficiary Name"
                    value={formData.beneficiaryName}
                    onChange={handleInputChange('beneficiaryName')}
                    variant="outline"
                    classNames="border-b-2 border-gray-200 py-3 px-0"
                    icon={<FiUser className="text-gray-400" />}
                    error={errors.beneficiaryName}
                  />
                </div>
                <div>
                  <InputField
                    label="Account Number"
                    value={formData.accountNumber}
                    onChange={handleInputChange('accountNumber')}
                    variant="outline"
                    classNames="border-b-2 border-gray-200 py-3 px-0"
                    icon={<FiCreditCard className="text-gray-400" />}
                    error={errors.beneficiaryAcct}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Bank Name"
                  value={formData.bankName}
                  onChange={handleInputChange('bankName')}
                  variant="outline"
                  classNames="border-b-2 border-gray-200 py-3 px-0"
                  icon={<FaUniversity className="text-gray-400" />}
                  error={errors.beneficiaryBank}
                />

                <InputField
                  label="Address (Optional)"
                  value={formData.bankAddress}
                  onChange={handleInputChange('address')}
                  variant="outline"
                  isRequired={false}
                  classNames="border-b-2 border-gray-200 py-3 px-0 flex-1"
                  icon={<FaLocationPin className="text-gray-400" />}
                  error={errors.bankAddress}
                />
                
               
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                  label="Routing Number"
                  value={formData.routingNumber}
                  onChange={handleInputChange('routingNumber')}
                  variant="outline"
                  classNames="border-b-2 border-gray-200 py-3 px-0 flex-1"
                  icon={<FiHome className="text-gray-400" />}
                  error={errors.routingNumb}
                />
                <InputField
                  label="PIN"
                  type="password"
                  value={formData.pin}
                  onChange={handleInputChange('pin')}
                  variant="outline"
                  classNames="border-b-2 border-gray-200 py-3 px-0 flex-1"
                  icon={<FiLock className="text-gray-400" />}
                  error={errors.pin}
                />
              </div>

              <div>
                <InputField
                  label="Description (Optional)"
                  value={formData.description}
                  onChange={handleInputChange('description')}
                  isRequired={false}
                  variant="outline"
                  icon={<FaEdit className='text-gray-400' />}
                  classNames="border-b-2 border-gray-200 py-3 px-0"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center cursor-pointer gap-2 px-5 py-3 bg-primary-2 text-white font-medium rounded-lg shadow-md transition-all hover:brightness-110 hover:scale-[1.01]"
              >
                <FiSend className="text-lg" /> Preview Transfer
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocalTransfer;