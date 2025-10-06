import { useState } from "react";
import { 
  FiCreditCard,
  FiArrowLeft,
  FiCheckCircle,
  FiInfo
} from "react-icons/fi";
import { FaCcMastercard, FaCcVisa, FaCcAmex } from "react-icons/fa";
import InputField from "../../components/common/InputField";
import SelectField from "../../components/common/SelectField";
import axios from "../../lib/axios";

const CardDeposit = () => {
  // Consolidated form state
  const [formData, setFormData] = useState({
    selectedAccount: "",
    amount: "",
    selectedCard:"",
    cardHolderName:"",
    cardNumber:"",
    cardExpiry:"",
    cardCvv:"",
  });

  // Handle input changes
   const handleInputChange = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const wallet = JSON.parse(localStorage.getItem("wallet"));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2); // Move to confirmation step
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setErrors({});
    
    try {
      const response = await axios.post('api/v1/users/me/transactions', {
        type: 'deposit',
        depositType: 'card deposit',
        account: formData.selectedAccount,
        amount: parseFloat(formData.amount),
        cardType: formData.selectedCard,
        cardHolderName: formData.cardHolderName,
        cardNumber: formData.cardNumber,
        cardExpiry: formData.cardExpiry,
        cardCvv: formData.cardCvv,
      });
      
      if (response.data.status === 'success') {
        setSuccessMessage(`Successfully deposited £${formData.amount} to your account`);
        setStep(1);
        // Reset form
        setFormData({
          selectedAccount: "",
          amount: "",
          selectedCard: "",
          cardHolderName: "",
          cardNumber: "",
          cardExpiry: "",
          cardCvv: "",
        });
      } else {
        setErrors(response.data.errors || { general: 'Transaction failed' });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setErrors({ general: error.response.data.message || 'Transaction failed' });
        }
      } else {
        setErrors({ general: 'Network error. Please try again.' });
      }
      console.log('Transaction error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Card type options for the select field
  const cardTypes = [
    { value: "mastercard", label: "Mastercard" },
    { value: "visa", label: "Visa" },
    { value: "amex", label: "American Express" }
  ];

  const accountOptions = [
    {
      value: "saving",
      label: `SAVINGS - ${wallet?.savingAccountNumber}  (${wallet?.currency}${wallet?.saving?.toLocaleString('en-US') || 0})`
    },
    {
      value: "checking",
      label: `CHECKING - ${wallet?.checkingAccountNumber}  (${wallet?.currency}${wallet?.checking?.toLocaleString('en-US') || 0})`
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiCreditCard className="text-primary-2 text-xl" />
          <h1 className="text-xl font-semibold text-gray-800 dark:text-slate-100">Card Deposit</h1>
        </div>
        
        <p className="text-gray-600 dark:text-slate-400 mb-6 flex items-center gap-1">
          <FiInfo className="text-primary-2" /> Fund your account from your External Debit/Credit Card
        </p>

        {successMessage && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 text-green-700 dark:text-green-400 p-4 rounded-lg mb-6">
            <div className="flex items-center gap-2">
              <FiCheckCircle className="text-lg" />
              <p>{successMessage}</p>
            </div>
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Account Selection */}
            <SelectField
              label="Account to Deposit"
              options={accountOptions}
              value={formData.selectedAccount}
              onChange={handleInputChange('selectedAccount')}
              variant="outline"
              error={errors.account}
            />
            {/* Amount */}
            <InputField
              label="Amount (£)"
              type="number"
              value={formData.amount}
              onChange={handleInputChange('amount')}
              variant="outline"
              placeholder="0.00"
              error={errors.amount}
            />
            {/* Card Type */}
            <div>
              <SelectField
                label="Credit/Debit Card"
                options={cardTypes}
                value={formData.selectedCard}
                onChange={handleInputChange('selectedCard')}
                variant="outline"
                error={errors.cardType}
              />

              <div className="flex gap-2 mt-2">
                <FaCcMastercard className="text-gray-700 dark:text-slate-300 text-xl" />
                <FaCcVisa className="text-blue-900 dark:text-blue-400 text-xl" />
                <FaCcAmex className="text-blue-500 dark:text-blue-400 text-xl" />
              </div>
            </div>

            {/* Cardholder Name */}
            <InputField
              label="Name on Card"
              name="cardHolderName"
              value={formData.cardHolderName}
              onChange={handleInputChange('cardHolderName')}
              variant="outline"
              required
              placeholder="John Doe"
              error={errors.cardHolderName}
            />

            {/* Card Number */}
            <InputField
              label="Card Number"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange('cardNumber')}
              variant="outline"
              required
              placeholder="1234 5678 9012 3456"
              error={errors.cardNumber}
            />

            {/* Expiry and CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <InputField
                  label="Expiry Date"
                  name="cardExpiry"
                  value={formData.cardExpiry}
                  onChange={handleInputChange('cardExpiry')}
                  variant="outline"
                  required
                  placeholder="MM/YY"
                  error={errors.cardExpiry}
                />
              </div>
              <div>
                <InputField
                  label="CVV"
                  name="cvv"
                  value={formData.cardCvv}
                  onChange={handleInputChange('cardCvv')}
                  variant="outline"
                  required
                  placeholder="123"
                  error={errors.cardCvv}
                />
              </div>
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex cursor-pointer items-center justify-center gap-2 px-5 py-3 bg-primary-2 text-white font-medium rounded-lg shadow-md transition-all hover:brightness-110"
            >
              Proceed to Confirmation
            </button>
          </form>
        ) : (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-100 mb-4">Confirm Deposit</h2>

            {/* Error message at top for confirmation step */}
            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 rounded-lg">
                <div className="flex items-center gap-2">
                  <FiInfo className="text-lg flex-shrink-0" />
                  <p className="font-medium">{errors.general}</p>
                </div>
              </div>
            )}

            {/* Deposit Details Card */}
            <div className="bg-primary-2/5 dark:bg-blue-900/20 p-4 rounded-lg border border-primary-2/20 dark:border-blue-800/30 mb-6">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-slate-400">Amount</p>
                  <p className="font-medium text-gray-800 dark:text-slate-100">£{formData.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-slate-400">Account</p>
                  <p className="font-medium text-gray-800 dark:text-slate-100 capitalize">
                    {formData.selectedAccount === 'saving' ? 'Savings' : 'Checking'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-slate-400">Card Ending With</p>
                  <p className="font-medium text-gray-800 dark:text-slate-100">
                    •••• {formData.cardNumber?.slice(-4) || '****'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-slate-400">Card Type</p>
                  <p className="font-medium text-gray-800 dark:text-slate-100 capitalize">
                    {formData.selectedCard}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex items-center cursor-pointer justify-center gap-2 w-full px-5 py-3 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-300 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
              >
                <FiArrowLeft /> Edit Details
              </button>
              <button
                onClick={handleConfirm}
                className={`w-full px-5 py-3 text-white font-medium rounded-lg shadow-md transition-all ${
                  isSubmitting 
                    ? "bg-gray-400 dark:bg-slate-600 cursor-not-allowed" 
                    : "bg-primary-2 hover:brightness-110 cursor-pointer"
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Confirm Deposit"}
              </button>
            </div>

            {/* Error message at bottom for confirmation step */}
            {errors.general && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 rounded-lg">
                <div className="flex items-center gap-2">
                  <FiInfo className="text-lg flex-shrink-0" />
                  <p className="font-medium">{errors.general}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardDeposit;