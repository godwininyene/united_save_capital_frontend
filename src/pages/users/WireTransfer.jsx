import { useState } from "react";
import { FiSend, FiInfo, FiCreditCard, FiDollarSign, FiUser, FiHome, FiLock, FiChevronLeft } from "react-icons/fi";
import { MdCheckCircle } from "react-icons/md";
import { FaPiggyBank, FaUniversity } from "react-icons/fa";
import InputField from "../../components/common/InputField";
import SelectField from "../../components/common/SelectField";
import axios from "../../lib/axios";

const WireTransfer = () => {
  const [amount, setAmount] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [pin, setPin] = useState("");
  const [bankAddress, setBankAddress] = useState("");
  const [description, setDescription] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (preview) {
      // This is the confirmation step, submit to API
      await submitTransaction();
    } else {
      // This is the preview step
      setPreview(true);
    }
  };

  const submitTransaction = async () => {
    setIsSubmitting(true);
    setErrors({});
    
    try {
      const formData = {
        type: 'transfer',
        transferType: 'wire transfer',
        amount,
        account: selectedAccount,
        beneficiaryName,
        beneficiaryAcct: accountNumber,
        beneficiaryBank: bankName,
        swiftCode,
        routingNumb: routingNumber,
        pin,
        bankAddress,
        description
      };

      const response = await axios.post('api/v1/users/me/transactions', formData);
      
      if (response.data.status === 'success') {
        setTransactionRef(response.data.data.transaction.reference);
        console.log(response.data);
        
        setPreview(false);
        setConfirmation(true);
      } else {
        setErrors(response.data.errors || { general: 'Transaction failed' });
      }
    } catch (err) {
      if (err.response) {
        // Backend validation errors
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
    setAmount("");
    setBeneficiaryName("");
    setAccountNumber("");
    setBankName("");
    setSwiftCode("");
    setRoutingNumber("");
    setPin("");
    setBankAddress("");
    setDescription("");
    setSelectedAccount("");
    setTransactionRef("");
    setErrors({});
  };

  return (
    <div className="">
      <div className="flex flex-col">
        {/* Wire Transfer Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-2">United Save Capital Secure Wire Transfer</h2>
          <p className="text-gray-600 dark:text-slate-400 mb-6 flex items-center gap-1">
            <FiInfo className="text-primary-2" /> Note: Wire Transactions Fee is 1%
          </p>

          {confirmation ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdCheckCircle className="text-green-500 text-5xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mb-2">Transfer Processed</h2>
              <p className="text-gray-700 dark:text-slate-300 max-w-md mx-auto mb-6">
                Your wire transfer of £{amount} to {beneficiaryName} has been successfully submitted.
              </p>
              <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg max-w-md mx-auto mb-6">
                <p className="text-sm text-gray-600 dark:text-slate-400">Transaction Reference</p>
                <p className="font-mono text-gray-800 dark:text-slate-200">{transactionRef}</p>
              </div>
              {description && (
                <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg max-w-md mx-auto mb-6">
                  <p className="text-sm text-gray-600 dark:text-slate-400">Description</p>
                  <p className="text-gray-800 dark:text-slate-200">{description}</p>
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
            <div className="bg-white dark:bg-slate-800 rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-100">Transfer Summary</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 text-primary-2 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                  Pending Confirmation
                </div>
              </div>

              {/* Error message at the top for better visibility */}
              {errors.general && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FiInfo className="text-lg flex-shrink-0" />
                    <p className="font-medium">{errors.general}</p>
                  </div>
                </div>
              )}

              <div className="space-y-5">
                {/* Summary Card */}
                <div className="bg-gray-50 dark:bg-slate-700 p-5 rounded-xl border border-gray-200 dark:border-slate-600">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-slate-400">From Account</p>
                        <p className="font-medium text-gray-800 dark:text-slate-100">
                          {selectedAccount === "savings" 
                            ? "SAVINGS - 0526 (£3,802,500.00)" 
                            : "CHECKING - 0253 (£0.00)"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-slate-400">Beneficiary</p>
                        <p className="font-medium text-gray-800 dark:text-slate-100">{beneficiaryName}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-slate-400">Bank Details</p>
                        <p className="font-medium text-gray-800 dark:text-slate-100">{bankName}</p>
                        <p className="text-sm text-gray-600 dark:text-slate-300">{accountNumber}</p>
                        {swiftCode && <p className="text-sm text-gray-600 dark:text-slate-300">SWIFT: {swiftCode}</p>}
                      </div>
                    </div>
                  </div>
                  {description && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-500 dark:text-slate-400">Description</p>
                      <p className="text-gray-800 dark:text-slate-200">{description}</p>
                    </div>
                  )}
                </div>

                {/* Amount Breakdown */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-5 rounded-xl border border-blue-100 dark:border-blue-800/30">
                  <h3 className="font-semibold text-gray-700 dark:text-slate-200 mb-3">Amount Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-slate-400">Transfer Amount</span>
                      <span className="font-medium text-gray-800 dark:text-slate-100">£{parseFloat(amount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-slate-400">Fee (1%)</span>
                      <span className="font-medium text-gray-800 dark:text-slate-100">£{(amount * 0.01).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-slate-600 my-2"></div>
                    <div className="flex justify-between">
                      <span className="text-gray-800 dark:text-slate-100 font-semibold">Total</span>
                      <span className="text-primary-2 font-bold">
                        £{(parseFloat(amount) + (amount * 0.01)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="p-5">
                  <h3 className="font-semibold text-gray-700 dark:text-slate-200 mb-3">Transfer Timeline</h3>
                  <div className="flex items-start">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-8 h-8 rounded-full bg-primary-2 flex items-center justify-center">
                        <MdCheckCircle className="text-white text-lg" />
                      </div>
                      <div className="w-0.5 h-12 bg-gray-300 dark:bg-slate-600"></div>
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-600 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-slate-400"></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="mb-6">
                        <p className="font-medium text-gray-800 dark:text-slate-100">Initiated</p>
                        <p className="text-sm text-gray-500 dark:text-slate-400">Just now</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500 dark:text-slate-400">Processing</p>
                        <p className="text-sm text-gray-400 dark:text-slate-500">Estimated completion: 1 business day</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons with error message at bottom */}
                <div className="space-y-4 pt-4">
                  {/* Error message at bottom for better visibility before buttons */}
                  {errors.general && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FiInfo className="text-lg flex-shrink-0" />
                        <p className="font-medium">{errors.general}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setPreview(false)}
                      className="flex-1 px-5 py-3 border cursor-pointer border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
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
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <SelectField
                    label="From"
                    name="account"
                    variant="outline"
                    options={accountOptions}
                    value={selectedAccount}
                    onChange={(e) => setSelectedAccount(e.target.value)}
                    required
                    classNames="border-b-2 border-gray-200 dark:border-slate-600 py-3 px-0"
                    icon={<FaPiggyBank className="text-gray-400 dark:text-slate-400" />}
                    error={errors.account}
                  />
                </div>
                <div>
                  <InputField
                    label="Enter Amount £"
                    name="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    variant="outline"
                    required
                    classNames="border-b-2 border-gray-200 dark:border-slate-600 py-3 px-0"
                    icon={<FiDollarSign className="text-gray-400 dark:text-slate-400" />}
                    error={errors.amount}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InputField
                    label="Beneficiary Name"
                    name="beneficiaryName"
                    value={beneficiaryName}
                    onChange={(e) => setBeneficiaryName(e.target.value)}
                    variant="outline"
                    required
                    classNames="border-b-2 border-gray-200 dark:border-slate-600 py-3 px-0"
                    icon={<FiUser className="text-gray-400 dark:text-slate-400" />}
                    error={errors.beneficiaryName}
                  />
                </div>
                <div>
                  <InputField
                    label="IBAN/Account Number"
                    name="beneficiaryAcct"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    variant="outline"
                    required
                    classNames="border-b-2 border-gray-200 dark:border-slate-600 py-3 px-0"
                    icon={<FiCreditCard className="text-gray-400 dark:text-slate-400" />}
                    error={errors.beneficiaryAcct}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Bank"
                  name="beneficiaryBank"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  variant="outline"
                  required
                  classNames="border-b-2 border-gray-200 dark:border-slate-600 py-3 px-0"
                  icon={<FaUniversity className="text-gray-400 dark:text-slate-400" />}
                  error={errors.beneficiaryBank}
                />
                
                <InputField
                  label="Swift Code"
                  name="swiftCode"
                  value={swiftCode}
                  onChange={(e) => setSwiftCode(e.target.value)}
                  variant="outline"
                  required
                  classNames="border-b-2 border-gray-200 dark:border-slate-600 py-3 px-0 flex-1"
                  icon={'✅'}
                  error={errors.swiftCode}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Routing Transit Number"
                  name="routingNumb"
                  value={routingNumber}
                  onChange={(e) => setRoutingNumber(e.target.value)}
                  variant="outline"
                  classNames="border-b-2 border-gray-200 dark:border-slate-600 py-3 px-0"
                  icon={<FiHome className="text-gray-400 dark:text-slate-400" />}
                  error={errors.routingNumb}
                />
               
                <InputField
                  label="PIN"
                  type="password"
                  name="pin"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  variant="outline"
                  required
                  classNames="border-b-2 border-gray-200 dark:border-slate-600 py-3 px-0 flex-1"
                  icon={<FiLock className="text-gray-400 dark:text-slate-400" />}
                  error={errors.pin}
                /> 
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Bank Address (Optional)"
                  name="bankAddress"
                  value={bankAddress}
                  onChange={(e) => setBankAddress(e.target.value)}
                  isRequired={false}
                  variant="outline"
                  classNames="border-b-2 border-gray-200 dark:border-slate-600 py-3 px-0"
                  error={errors.bankAddress}
                />

                <InputField
                  label="Description (Optional)"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  isRequired={false}
                  variant="outline"
                  classNames="border-b-2 border-gray-200 dark:border-slate-600 py-3 px-0"
                  error={errors.description}
                />
              </div>

              {/* Error message at bottom for better visibility before submit button */}
              {errors.general && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FiInfo className="text-lg flex-shrink-0" />
                    <p className="font-medium">{errors.general}</p>
                  </div>
                </div>
              )}

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

export default WireTransfer;