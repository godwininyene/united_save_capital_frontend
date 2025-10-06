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

const BuyCrypto = () => {
  // Consolidated form state
  const [formData, setFormData] = useState({
    selectedCoin: "",
    amount: "",
    walletAddress: "",
    selectedCard: "",
    cardHolderName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
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
        depositType: 'crypto deposit',
        coin: formData.selectedCoin,
        walletAddress: formData.walletAddress,
        amount: parseFloat(formData.amount),
        cardType: formData.selectedCard,
        cardHolderName: formData.cardHolderName,
        cardNumber: formData.cardNumber,
        cardExpiry: formData.cardExpiry,
        cardCvv: formData.cardCvv,
      });
      
      if (response.data.status === 'success') {
        setSuccessMessage(`Successfully purchased £${formData.amount} worth of ${formData.selectedCoin.toUpperCase()}`);
        setStep(1);
        // Reset form
        setFormData({
          selectedCoin: "",
          amount: "",
          walletAddress: "",
          selectedCard: "",
          cardHolderName: "",
          cardNumber: "",
          cardExpiry: "",
          cardCvv: "",
        });
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
      console.log('Transaction error:', err);
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

  // Crypto options
  const cryptoOptions = [
    { value: "btc", label: "Bitcoin (BTC)" },
    { value: "eth", label: "Ethereum (ETH)" },
    { value: "usdt", label: "Tether (USDT)" },
    { value: "sol", label: "Solana (SOL)" }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiCreditCard className="text-primary-2 text-xl" />
          <h1 className="text-xl font-semibold text-gray-800 dark:text-slate-100">Buy Crypto</h1>
        </div>
        
        <p className="text-gray-600 dark:text-slate-400 mb-6 flex items-center gap-1">
          Buy Crypto using your Credit/Debit Card
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
            {/* Crypto Selection */}
            <SelectField
              label="Coin"
              options={cryptoOptions}
              value={formData.selectedCoin}
              onChange={handleInputChange('selectedCoin')}
              variant="outline"
              error={errors.coin}
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

            {/* Wallet */}
            <InputField
              label="Receiving Wallet Address"
              value={formData.walletAddress}
              onChange={handleInputChange('walletAddress')}
              variant="outline"
              placeholder="Enter your wallet address"
              error={errors.walletAddress}
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
              value={formData.cardHolderName}
              onChange={handleInputChange('cardHolderName')}
              variant="outline"
              placeholder="John Doe"
              error={errors.cardHolderName}
            />

            {/* Card Number */}
            <InputField
              label="Card Number"
              value={formData.cardNumber}
              onChange={handleInputChange('cardNumber')}
              variant="outline"
              placeholder="1234 5678 9012 3456"
              error={errors.cardNumber}
            />

            {/* Expiry and CVV */}
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Expiry Date"
                value={formData.cardExpiry}
                onChange={handleInputChange('cardExpiry')}
                variant="outline"
                placeholder="MM/YY"
                error={errors.cardExpiry}
              />
              <InputField
                label="CVV"
                value={formData.cardCvv}
                onChange={handleInputChange('cardCvv')}
                variant="outline"
                placeholder="123"
                error={errors.cardCvv}
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex cursor-pointer items-center justify-center gap-2 px-5 py-3 bg-primary-2 text-white font-medium rounded-lg shadow-md transition-all hover:brightness-110 hover:scale-[1.02]"
            >
              Proceed to Confirmation
            </button>
          </form>
        ) : (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-100 mb-4">Confirm Purchase</h2>

            {/* Error message at top for confirmation step */}
            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 rounded-lg">
                <div className="flex items-center gap-2">
                  <FiInfo className="text-lg flex-shrink-0" />
                  <p className="font-medium">{errors.general}</p>
                </div>
              </div>
            )}

            {/* Purchase Details Card */}
            <div className="bg-primary-2/5 dark:bg-blue-900/20 p-4 rounded-lg border border-primary-2/20 dark:border-blue-800/30 mb-6">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-slate-400">Crypto</p>
                  <p className="font-medium text-gray-800 dark:text-slate-100">
                    {cryptoOptions.find(c => c.value === formData.selectedCoin)?.label || formData.selectedCoin.toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-slate-400">Amount</p>
                  <p className="font-medium text-gray-800 dark:text-slate-100">£{formData.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-slate-400">Receiving Wallet</p>
                  <p className="font-medium text-gray-800 dark:text-slate-100 break-all">
                    {formData.walletAddress}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-slate-400">Payment Method</p>
                  <p className="font-medium text-gray-800 dark:text-slate-100">
                    Card ending with •••• {formData.cardNumber?.slice(-4) || '****'}
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
                {isSubmitting ? "Processing..." : "Confirm Purchase"}
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

export default BuyCrypto;