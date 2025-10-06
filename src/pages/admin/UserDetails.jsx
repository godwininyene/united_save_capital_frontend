import coverImage from './../../assets/forex.jpeg';
import defaultAvatar from './../../assets/default.png'
import { BsGenderAmbiguous,  BsTrash3 } from 'react-icons/bs';
import { RiExchangeFundsLine } from 'react-icons/ri';
import { FaUpwork } from 'react-icons/fa6';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import {
    BiPhone,
    BiGlobeAlt,
    BiMapPin,
    BiPlug,
    BiUserCheck,
    BiLogoFlickr
  } from 'react-icons/bi';
  import { FaUserTimes } from 'react-icons/fa';

const UserDetail = ({ user, onStatusChange, onDelete, onFund, updating, deleting, statusBadge }) => {
    const base_url = import.meta.env.VITE_APP_BASE_URL;
    
    return (
        <div className="bg-white dark:bg-slate-800 overflow-hidden transition-colors">
            {/* Cover Image - Reduced height for modal */}
            <div className="min-h-[80px] bg-cover bg-center relative" style={{ backgroundImage: `url(${coverImage})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 relative">
                {/* Profile Avatar - Adjusted positioning */}
                <div className="flex justify-center -mt-12 mb-3">
                    <div className="relative">
                        {user?.photo ? (
                            <img 
                                src={`${base_url}/${user.photo}`} 
                                alt={user.fullname} 
                                className="h-20 w-20 rounded-full border-4 border-white dark:border-slate-800 bg-white dark:bg-slate-700 shadow-lg"
                            />
                        ) : (
                            <img 
                                src={defaultAvatar}  
                                alt="Default Avatar"
                                className="h-20 w-20 rounded-full border-4 border-white dark:border-slate-800 bg-white dark:bg-slate-700 shadow-lg"
                            />
                        )}
                    </div>
                </div>
                
                {/* User Info Header */}
                <div className="text-center mb-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">{user.fullname}</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mb-2 line-clamp-1">{user.email}</p>
                    <div className="inline-flex">{statusBadge(user.status)}</div>
                </div>
            
                
                {/* User Details Grid - Compact for modal */}
                <div className="space-y-3 mb-4">
                    <div className="grid grid-cols-1 gap-2">
                        {/* Phone */}
                        <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-slate-700/50">
                            <div className="flex-shrink-0">
                                <BiPhone className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Phone</p>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {user.phone || 'Not provided'}
                                </p>
                            </div>
                        </div>
                        
                        {/* Country */}
                        <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-slate-700/50">
                            <div className="flex-shrink-0">
                                <BiGlobeAlt className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Country</p>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {user.country || 'Not provided'}
                                </p>
                            </div>
                        </div>
                        
                        {/* Address */}
                        <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-slate-700/50">
                            <div className="flex-shrink-0">
                                <BiMapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Address</p>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">
                                    {user.address || 'Not provided'}
                                </p>
                            </div>
                        </div>

                        {/* City & Gender Row */}
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-slate-700/50">
                                <div className="flex-shrink-0">
                                    <BiLogoFlickr className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">City</p>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
                                        {user.city || 'N/A'}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-slate-700/50">
                                <div className="flex-shrink-0">
                                    <BsGenderAmbiguous className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Gender</p>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
                                        {user.gender || 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Occupation */}
                        <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-slate-700/50">
                            <div className="flex-shrink-0">
                                <FaUpwork className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Occupation</p>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
                                    {user.occupation || 'Not specified'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200 dark:border-slate-600">
                    {/* Status Toggle */}
                    <div className="text-center">
                        {user.status === 'active' ? (
                            <div className="space-y-1">
                                <button 
                                    className="w-10 h-10 bg-red-500 hover:bg-red-600 disabled:bg-red-400 cursor-pointer text-white rounded-lg flex items-center justify-center mx-auto transition-colors shadow-md"
                                    onClick={() => onStatusChange(user._id, 'deactivate')}
                                    disabled={updating}
                                >
                                    {updating ? <LoadingIndicator size={5} /> : <BiPlug className="h-4 w-4" />}
                                </button>
                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 block">
                                    Deactivate
                                </span>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                <button 
                                    className="w-10 h-10 bg-green-500 hover:bg-green-600 disabled:bg-green-400 cursor-pointer text-white rounded-lg flex items-center justify-center mx-auto transition-colors shadow-md"
                                    onClick={() => onStatusChange(user._id, 'approve')}
                                    disabled={updating}
                                >
                                    {updating ? <LoadingIndicator size={5} /> : <BiUserCheck className="h-4 w-4" />}
                                </button>
                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 block">
                                    Activate
                                </span>
                            </div>
                        )}
                    </div>
                    
                    {/* Fund/Deny Access */}
                    <div className="text-center">
                        {user.status === 'pending' ? (
                            <div className="space-y-1">
                                <button 
                                    className="w-10 h-10 bg-red-500 hover:bg-red-600 disabled:bg-red-400 cursor-pointer text-white rounded-lg flex items-center justify-center mx-auto transition-colors shadow-md"
                                    onClick={() => onStatusChange(user._id, 'deny')}
                                    disabled={updating}
                                >
                                    {updating ? <LoadingIndicator size={5} /> : <FaUserTimes className="h-4 w-4" />}
                                </button>
                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 block">
                                    Deny
                                </span>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                <button 
                                    className="w-10 h-10 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white rounded-lg flex items-center justify-center mx-auto transition-colors shadow-md"
                                    onClick={onFund}
                                >
                                    <RiExchangeFundsLine className="h-4 w-4" />
                                </button>
                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 block">
                                    Fund
                                </span>
                            </div>
                        )}
                    </div>
                    
                    {/* Delete Account */}
                    <div className="text-center">
                        <div className="space-y-1">
                            <button 
                                className="w-10 h-10 bg-red-500 hover:bg-red-600 disabled:bg-red-400 cursor-pointer text-white rounded-lg flex items-center justify-center mx-auto transition-colors shadow-md"
                                onClick={() => onDelete(user)}
                                disabled={deleting}
                            >
                                {deleting ? <LoadingIndicator size={5} /> : <BsTrash3 className="h-4 w-4" />}
                            </button>
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 block">
                                Delete
                            </span>
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-xs text-blue-700 dark:text-blue-300 text-center">
                        Joined {new Date(user.createdAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;