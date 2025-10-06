import LoadingIndicator from '../../components/common/LoadingIndicator';
import coverImage from './../../assets/forex.jpeg';
import defaultAvatar from './../../assets/default.png'
import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { AiOutlineTransaction } from 'react-icons/ai';
import axios from '../../lib/axios';
import InputField from '../../components/common/InputField';
import SelectField from '../../components/common/SelectField';

const FundAccount = ({user, onBack, onFunded = () => Object}) => {
    const base_url = import.meta.env.VITE_APP_BASE_URL;
    let back = () => {
        onBack();
    }

    const accountOptions =[
        {
            label:`SAVINGS - ${user?.wallet[0].savingAccountNumber} (${user?.wallet[0].currency}${user?.wallet[0].saving.toLocaleString('en-US') || 0} )`,
            value:"saving"
        },
        {
            label:`CHECKING - ${user?.wallet[0].checkingAccountNumber} (${user?.wallet[0].currency}${user?.wallet[0].checking.toLocaleString('en-US') || 0})`,
            value:"checking"
        }
    ]
    
    const [processing, setProcessing] = useState(false);
    const [message, setErrorMessage] = useState('');
    let submit = async (e) => {
        e.preventDefault();
        let form =  new FormData(e.target)
        setErrorMessage('')
        setProcessing(true);
        await axios.patch(`api/v1/users/${user._id}/wallets`, form)
        .then((res) => {
            if(res.data.status ==='success'){
                alert('Account funded successfully!')
                e.target.reset();
                setProcessing(false);              
                onFunded(res.data.data.user)
            }
        })
        .catch((err) => {
            console.log(err)
            setErrorMessage(err.response?.data?.message)
            alert("Something went very wrong!")
            setProcessing(false);
        });
    }

    return (
        <section className="min-h-screen bg-gray-50 dark:bg-slate-900 p-6 transition-colors">
            <div className="mb-6">
                <button 
                    onClick={() => back()} 
                    className="flex items-center gap-2 cursor-pointer py-2 px-4 rounded-lg bg-gradient-to-t from-primary-2 to-primary-3 hover:from-primary-3 hover:to-primary-2 shadow-md text-white font-semibold transition-all duration-300"
                >
                    <BiArrowBack className="h-5 w-5" /> Back to Users
                </button>
            </div>

            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* User Profile Card */}
                    <section className="lg:col-span-1">
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden transition-colors">
                            <div className="min-h-[120px] bg-cover bg-center rounded-t-xl" style={{backgroundImage: `url(${coverImage})`}}></div>
                            
                            {user && (
                                <div className="relative">
                                    <div className="flex justify-center -mt-16 mb-4">
                                        <div className="h-28 w-28 rounded-full border-4 border-white dark:border-slate-800 bg-white dark:bg-slate-700 shadow-lg overflow-hidden">
                                            {user?.photo ? (
                                                <img 
                                                    src={`${base_url}/${user.photo}`} 
                                                    alt={user.fullname} 
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <img 
                                                    src={defaultAvatar} 
                                                    alt="Default Avatar"
                                                    className="h-full w-full object-cover"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    
                                    <section className="px-6 pb-6 text-center">
                                        <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                                            {user.fullname}
                                        </h1>
                                        <p className="text-sm font-medium text-primary-2 dark:text-primary-300 mb-2">
                                            {user.email}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                            Status: 
                                            <span className={`ml-2 font-bold ${
                                                user.status === 'pending' ? 'text-orange-500' : 
                                                user.status === 'active' ? 'text-green-500' : 
                                                'text-red-500'
                                            }`}>
                                                {user.status}
                                            </span>
                                        </p>

                                        <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4">
                                            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                                Account Balances
                                            </h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="text-center">
                                                    <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Savings</h4>
                                                    <p className="text-lg font-bold text-gray-800 dark:text-white">
                                                        {user?.wallet[0].currency}{user?.wallet[0].saving.toLocaleString('en-US') || 0}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        {user?.wallet[0].savingAccountNumber}
                                                    </p>
                                                </div>
                                                <div className="text-center">
                                                    <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Checking</h4>
                                                    <p className="text-lg font-bold text-gray-800 dark:text-white">
                                                        {user?.wallet[0].currency}{user?.wallet[0].checking.toLocaleString('en-US') || 0}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        {user?.wallet[0].checkingAccountNumber}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Funding Form */}
                    <section className="lg:col-span-2">
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 transition-colors">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                    Fund User Account
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Transfer funds to user's savings or checking account
                                </p>
                            </div>

                            <form onSubmit={submit}>
                                <div className="space-y-6">
                                    <div>
                                        <SelectField
                                            options={accountOptions}
                                            label={'Select Account to Fund'}
                                            name={'account'}
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <InputField 
                                            name={'amount'}
                                            type='number'
                                            placeholder={'Enter amount to transfer'}
                                            label={'Transfer Amount'}
                                            required
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>

                                    {message && (
                                        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                            <p className="text-sm text-red-600 dark:text-red-400">
                                                {message}
                                            </p>
                                        </div>
                                    )}

                                    <div className="pt-4">
                                        <button 
                                            disabled={processing} 
                                            className="w-full inline-flex gap-3 justify-center items-center bg-gradient-to-r from-primary-2 to-primary-3 hover:from-primary-3 hover:to-primary-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-xl font-semibold px-6 py-4 transition-all duration-300 ease-in-out text-white shadow-lg hover:shadow-xl"
                                        >
                                            {processing ? (
                                                <>
                                                    <LoadingIndicator className="w-5 h-5" /> 
                                                    Processing Transfer...
                                                </>
                                            ) : (
                                                <>
                                                    <AiOutlineTransaction className="w-5 h-5" /> 
                                                    Complete Transfer
                                                </>
                                            )}
                                        </button>
                                        
                                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
                                            This action will immediately credit the selected account
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-5 h-5 text-blue-500 mt-0.5">
                                    <AiOutlineTransaction className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">
                                        Transfer Guidelines
                                    </h4>
                                    <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
                                        <li>• Funds are transferred instantly to the selected account</li>
                                        <li>• Verify the account type before confirming transfer</li>
                                        <li>• Ensure the amount is correct before proceeding</li>
                                        <li>• This action cannot be undone once completed</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    )
}

export default FundAccount