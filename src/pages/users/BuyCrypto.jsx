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
    walletAddress:"",
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



  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2); // Move to confirmation step
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('api/v1/users/me/transactions', {
        type: 'deposit',
        depositType: 'crypto deposit',
        coin:formData.selectedCoin,
        walletAddress:formData.walletAddress,
        amount: parseFloat(formData.amount),
        cardType: formData.selectedCard,
        cardHolderName:formData.cardHolderName,
        cardNumber: formData.cardNumber,
        cardExpiry:formData.cardExpiry,
        cardCvv:formData.cardCvv,
      });
      
      if (response.data.status === 'success') {
        setSuccessMessage(`Successfully purchased £${formData.amount} worth of ${formData.selectedCoin.toUpperCase()}`);
        setStep(1);
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
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiCreditCard className="text-primary-2 text-xl" />
          <h1 className="text-xl font-semibold text-gray-800">Buy Crypto</h1>
        </div>
        
        <p className="text-gray-600 mb-6 flex items-center gap-1">
          Buy Crypto using your Credit/Debit Card
        </p>

        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6">
            {successMessage}
          </div>
        )}

        {errors.general && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg">
            {errors.general}
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
                <FaCcMastercard className="text-gray-700 text-xl" />
                <FaCcVisa className="text-blue-900 text-xl" />
                <FaCcAmex className="text-blue-500 text-xl" />
              </div>
            </div>

            {/* Cardholder Name */}
            <InputField
              label="Name on Card"
              name="name"
              value={formData.cardHolderName}
              onChange={handleInputChange('cardHolderName')}
              variant="outline"
              placeholder="John Doe"
              error={errors.cardHolderName}
            />

            {/* Card Number */}
            <InputField
              label="Card Number"
              name="number"
              value={formData.cardNumber}
              onChange={handleInputChange('cardNumber')}
              variant="outline"
              required
              placeholder="1234 5678 9012 3456"
              error={errors.cardNumber}
            />

            {/* Expiry and CVV */}
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Expiry Date"
                name="expiry"
                value={formData.cardExpiry}
                onChange={handleInputChange('cardExpiry')}
                variant="outline"
                placeholder="MM/YY"
                error={errors.cardExpiry}
              />
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-primary-2 text-white font-medium rounded-lg shadow-md transition-all hover:brightness-110"
            >
              Proceed to Confirmation
            </button>
          </form>
        ) : (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Purchase</h2>

            {/* Purchase Details Card */}
            <div className="bg-primary-2/5 p-4 rounded-lg border border-primary-2/20 mb-6">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Crypto</p>
                  <p className="font-medium text-gray-800">
                    {cryptoOptions.find(c => c.value === formData.selectedCoin)?.label || formData.selectedCoin.toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className="font-medium text-gray-800">£{formData.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Receiving Wallet</p>
                  <p className="font-medium text-gray-800 break-all">
                    {formData.walletAddress}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="font-medium text-gray-800">
                    Card ending with •••• {formData.cardNumber.slice(-4)}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300"
              >
                <FiArrowLeft /> Edit Details
              </button>
              <button
                onClick={handleConfirm}
                className={`w-full px-5 py-3 text-white font-medium rounded-lg shadow-md transition-all ${
                  isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-primary-2 hover:brightness-110"
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Confirm Purchase"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyCrypto;