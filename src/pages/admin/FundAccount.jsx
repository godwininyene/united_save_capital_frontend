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
        <section>
            <div className="mb-4">
                <button onClick={() => back()} className="flex items-center gap-2 cursor-pointer py-2 px-4 rounded-3xl bg-gradient-to-t from-primary-2 to-primary-3 shadow-md text-slate-100 font-semibold">
                    <BiArrowBack className="h-6 w-6" /> Back
                </button>
            </div>

            {/*  */}
            <aside>
                <div className="grid grid-cols-1 md:grid-cols-5 max-w-4xl gap-4">
                    <section className="md:col-span-2">
                        <div className="bg-white dark:bg-slate-700 dark:text-slate-200 rounded-md">
                            <div className="min-h-[150px] bg-cover rounded-t-md" style={{backgroundImage: `url(${coverImage})`}}>

                            </div>
                            { user && (<>
                                <div>
                                    <span className="mx-auto h-32 w-32 block -mt-20">
                                        {user?.photo ? (
                                            <img 
                                            src={`${base_url}/${user.photo}`} 
                                            alt={user.fullname} 
                                            className="h-28 w-28 rounded-full border-4 border-white dark:border-slate-800 bg-white dark:bg-slate-700"
                                            />
                                        ) : (
                                            <img src={defaultAvatar}  className="h-32 w-32 rounded-full border-4 border-white dark:border-slate-800 bg-white dark:bg-slate-700" />
                                        )}
                                    </span>
                                    <section className="px-4 py-3 text-center">
                                        <h1 className="text-xl font-bold">
                                            { user.fullname }
                                        </h1>
                                        <p className="text-sm font-semibold text-primary">
                                            { user.email }
                                        </p>
                                        <p className="text-sm capitalize">
                                            Status: 
                                            <span className={`ml-2 font-bold ${(user.status == 'pending') ? 'text-orange-500' : (user.status == 'active') ? 'text-green-500' : 'text-red-500'}`}>
                                                {user.status}
                                            </span>
                                        </p>

                                        <h2 className='mt-6'>Payment Channels/Bank Accounts</h2>
                                        <div className="grid grid-cols-2 mt-6 border-y pb-1 pt-2 divide-x">
                                            {/* Action */}
                                            <aside>
                                                <h6>Savings</h6>
                                                {user?.wallet[0].currency}{user?.wallet[0].saving.toLocaleString('en-US') ||0}
                                                
                                            </aside>
                                            {/* Fund */}
                                            <aside>
                                                <h6>Checking</h6>
                                                {user?.wallet[0].currency}{user?.wallet[0].checking.toLocaleString('en-US') ||0}
                                                0
                                            </aside>
                                        </div>
                                    </section>
                                </div>
                            </>)}
                        </div>
                    </section>
                    <section className="md:col-span-3">
                        <div className="bg-white dark:bg-slate-700 dark:text-slate-200 rounded-md py-3 px-4">
                            <form className='' method='post' onSubmit={submit}>
                               
                                <div className="mb-5 relative">
                                    <SelectField
                                        options={accountOptions}
                                        label={'Choose Wallet to fund'}
                                        name={'account'}
                                    />
                                   
                                </div>
                                <div className="mb-5 relative">
                                    <InputField 
                                        name={'amount'}
                                        type='number'
                                        placeholder={'Enter Enter amount'}
                                        label={'Amount'}
                                    />
                                </div>
                               
                                {message !== '' && <p className={'text-sm text-red-600 mb-2'}>
                                    {message}
                                </p>}
                                <div className='text-left'>
                                    <button disabled={processing} className='inline-flex gap-2 justify-center items-center bg-primary-2 hover:bg-primary-3 cursor-pointer rounded-md font-semibold px-4 py-3 transition-all duration-300 ease-in  text-white'>
                                        {processing ? <>
                                                <LoadingIndicator className="w-6 h-6"  /> Funding...
                                            </>
                                            : 
                                            <>
                                                <AiOutlineTransaction className="w-6 h-6"  /> Proceed with Funding
                                            </> 
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </aside>
        </section>
    )
}

export default FundAccount