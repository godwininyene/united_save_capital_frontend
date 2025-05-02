import { useState } from "react";
import { FiSend,  FiCreditCard, FiDollarSign, FiUser, FiHome, FiLock, FiChevronLeft } from "react-icons/fi";
import { MdCheckCircle } from "react-icons/md";
import { FaPiggyBank, FaUniversity } from "react-icons/fa";
import InputField from "../../components/common/InputField";
import SelectField from "../../components/common/SelectField";
import { FaLocationPin } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const LocalTransfer = () => {
  const [amount, setAmount] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [pin, setPin] = useState("");
  const [bankAddress, setBankAddress] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [preview, setPreview] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const accountOptions = [
    {
      value: "savings",
      label: "SAVINGS - 0526 (£3,802,500.00)"
    },
    {
      value: "checking",
      label: "CHECKING - 0253 (£0.00)"
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

  // const handleConfirm = () => {
  //   setPreview(false);
  //   setConfirmation(true);
  // };

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

  return (
    <div className="">
      <div className=" flex flex-col">
        {/* Wire Transfer Section */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">United Save Capital secure Local Transfer</h2>
          <p className="text-gray-600 mb-6 flex items-center gap-1">
           Transfer Funds to a local Bank
          </p>

          {confirmation ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdCheckCircle className="text-green-500 text-5xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Transfer Processed</h2>
              <p className="text-gray-700 max-w-md mx-auto mb-6">
                Your local transfer of £{amount} to {beneficiaryName} has been successfully submitted.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg max-w-md mx-auto mb-6">
                <p className="text-sm text-gray-600">Transaction Reference</p>
                <p className="font-mono text-gray-800">WT-{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
              </div>
              <button
                onClick={() => {
                  setConfirmation(false);
                  setAmount("");
                  setBeneficiaryName("");
                  setAccountNumber("");
                  setBankName("");
                  setSwiftCode("");
                  setRoutingNumber("");
                  setPin("");
                  setBankAddress("");
                  setSelectedAccount("");
                }}
                className="px-6 py-3 bg-primary-2 text-white font-medium rounded-lg shadow-md hover:brightness-110 transition-all"
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

              <div className="space-y-5">
                {/* Summary Card */}
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">From Account</p>
                        <p className="font-medium text-gray-800">
                          {selectedAccount === "savings" 
                            ? "SAVINGS - 0526 (£3,802,500.00)" 
                            : "CHECKING - 0253 (£0.00)"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Beneficiary</p>
                        <p className="font-medium text-gray-800">{beneficiaryName}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Bank Details</p>
                        <p className="font-medium text-gray-800">{bankName}</p>
                        <p className="text-sm text-gray-600">{accountNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amount Breakdown */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100">
                  <h3 className="font-semibold text-gray-700 mb-3">Amount Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transfer Amount</span>
                      <span className="font-medium">£{parseFloat(amount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fee (1%)</span>
                      <span className="font-medium">£{(amount * 0.01).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 my-2"></div>
                    <div className="flex justify-between">
                      <span className="text-gray-800 font-semibold">Total</span>
                      <span className="text-primary-2 font-bold">
                        £{(parseFloat(amount) + (amount * 0.01)).toFixed(2)}
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
                    onClick={handleConfirm}
                    className="flex-1 px-5 py-3 bg-primary-2 cursor-pointer text-white font-medium rounded-lg shadow-sm hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    Confirm Transfer <FiSend />
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
                    value={selectedAccount}
                    onChange={(e) => setSelectedAccount(e.target.value)}
                    required
                    classNames="border-b-2 border-gray-200 py-3 px-0"
                    icon={<FaPiggyBank className="text-gray-400" />}
                  />
                </div>
                <div>
                  <InputField
                    label="Enter Amount £"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    variant="outline"
                    required
                    classNames="border-b-2 border-gray-200 py-3 px-0"
                    icon={<FiDollarSign className="text-gray-400" />}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InputField
                    label="Beneficiary Name"
                    value={beneficiaryName}
                    onChange={(e) => setBeneficiaryName(e.target.value)}
                    variant="outline"
                    required
                    classNames="border-b-2 border-gray-200 py-3 px-0"
                    icon={<FiUser className="text-gray-400" />}
                  />
                </div>
                <div>
                  <InputField
                    label="IBAN/Account Number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    variant="outline"
                    classNames="border-b-2 border-gray-200 py-3 px-0"
                    icon={<FiCreditCard className="text-gray-400" />}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Bank"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  variant="outline"
                  required
                  classNames="border-b-2 border-gray-200 py-3 px-0"
                  icon={<FaUniversity className="text-gray-400" />}
                />
                
                <InputField
                  label="Address (Optional)"
                  value={swiftCode}
                  onChange={(e) => setSwiftCode(e.target.value)}
                  variant="outline"
                  isRequired={false}
                  classNames="border-b-2 border-gray-200 py-3 px-0 flex-1"
                  icon={<FaLocationPin className="text-gray-400" />}
                />
                 
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Routing Transit Number"
                  value={routingNumber}
                  onChange={(e) => setRoutingNumber(e.target.value)}
                  variant="outline"
                  classNames="border-b-2 border-gray-200 py-3 px-0"
                  icon={<FiHome className="text-gray-400" />}
                />
               
              
                <InputField
                  label="PIN"
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  variant="outline"
                  required
                  classNames="border-b-2 border-gray-200 py-3 px-0 flex-1"
                  icon={<FiLock className="text-gray-400" />}
                /> 
                
              </div>

              <div>
                <InputField
                  label="Remark (Optional))"
                  value={bankAddress}
                  onChange={(e) => setBankAddress(e.target.value)}
                  isRequired={false}
                  variant="outline"
                  required={false}
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