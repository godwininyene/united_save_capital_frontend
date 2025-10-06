import { useState } from "react";
import InputField from './../../components/common/InputField'
import axios from "../../lib/axios";
import defaultAvatar from './../../assets/default.png'

const UserSettings = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [password, setPassword] = useState({ current: "", new: "", confirm: "" });
  const [notifications, setNotifications] = useState({ email: true, sms: false });
  const [avatarPreview, setAvatarPreview] = useState(user?.photo || defaultAvatar);
  const [errors, setErrors] = useState({});
  const [profileSuccess, setProfileSuccess] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);

  const base_url = import.meta.env.VITE_APP_BASE_URL;

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setProfileSuccess(null);
    setErrors({});
    let form = new FormData(e.target);
    
    try {
      const res = await axios.patch('/api/v1/users/updateMe', form);
      if(res.data.status === 'success'){
        setProfileSuccess("Profile updated successfully!");
        // Update local storage if needed
        const updatedUser = { ...user, ...res.data.data.user };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (err) {
      setErrors(err?.response?.data?.errors || {});
      alert(err?.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setIsPasswordSubmitting(true);
    setPasswordSuccess(null);
    setErrors({});
    
    try {
      const res = await axios.patch('/api/v1/users/updateMyPassword', {
        passwordCurrent: password.current,
        password: password.new,
        passwordConfirm: password.confirm
      });
      
      if(res.data.status === 'success'){
        setPasswordSuccess("Password updated successfully!");
        setPassword({ current: "", new: "", confirm: "" });
      }
    } catch (err) {
      if (err.response) {
        if (err.response.data.errors) {
          setErrors(err.response.data.errors);
        } else {
          setErrors({ general: err.response.data.message || 'Password update failed' });
        }
      } else {
        setErrors({ general: 'Network error. Please try again.' });
      }
    } finally {
      setIsPasswordSubmitting(false);
    }
  };

  const handleNotificationChange = (e) => {
    setNotifications({ ...notifications, [e.target.name]: e.target.checked });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-800 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-slate-100">User Settings</h2>

      {/* Profile Settings */}
      <div className="mb-6 border-b border-gray-200 dark:border-slate-700 pb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-slate-100">Profile Information</h3>
        {profileSuccess && (
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded border border-green-200 dark:border-green-800/30">
            {profileSuccess}
          </div>
        )}
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <InputField
            label="Full Name"
            defaultValue={user?.fullname || 'N/A'}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            name={'fullname'}
            error={errors.fullname}
            variant="outline"
          />
          <InputField
            label="Email Address"
            defaultValue={user?.email || 'N/A'}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            name={'email'}
            error={errors.email}
            variant="outline"
          />
          <InputField
            label="Phone Number"
            defaultValue={user?.phone || 'N/A'}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            name={'phone'}
            error={errors.phone}
            variant="outline"
          />
          
          {/* Avatar Upload */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700 dark:text-slate-300">Profile Photo</p>
            <div className="flex items-center gap-6">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100 dark:border-slate-600">
                <img 
                  src={avatarPreview?.startsWith('data:') ? avatarPreview : `${base_url}/${avatarPreview}`} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-primary-2 text-white rounded-lg hover:bg-primary-2/90 transition-colors">
                  Change Photo
                  <input
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    name={'photo'}
                    onChange={handleAvatarChange}
                  />
                </label>
                {errors.photo && (
                  <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.photo}</p>
                )}
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">
                  Recommended: Square image, max 2MB
                </p>
              </div>
            </div>
          </div>

          {/* Error message for general profile errors */}
          {errors.general && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded border border-red-200 dark:border-red-800/30">
              {errors.general}
            </div>
          )}

          <div className="mt-3">
            <button 
              disabled={isSubmitting}
              type="submit" 
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                isSubmitting 
                  ? 'cursor-not-allowed bg-gray-400 dark:bg-slate-600 text-white' 
                  : 'cursor-pointer bg-primary-2 hover:bg-primary-2/90 text-white hover:scale-[1.02]'
              }`}
            >
              {isSubmitting ? 'Processing...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>

      {/* Password Change */}
      <div className="mb-6 border-b border-gray-200 dark:border-slate-700 pb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-slate-100">Change Password</h3>
        {passwordSuccess && (
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded border border-green-200 dark:border-green-800/30">
            {passwordSuccess}
          </div>
        )}
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <InputField
            type="password"
            label="Current Password"
            value={password.current}
            onChange={(e) => setPassword({ ...password, current: e.target.value })}
            placeholder="Enter current password"
            required
            error={errors.passwordCurrent}
            variant="outline"
          />
          <InputField
            type="password"
            label="New Password"
            value={password.new}
            onChange={(e) => setPassword({ ...password, new: e.target.value })}
            placeholder="Enter new password"
            required
            error={errors.password}
            variant="outline"
          />
          <InputField
            type="password"
            label="Confirm New Password"
            value={password.confirm}
            onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
            placeholder="Confirm new password"
            required
            error={errors.passwordConfirm}
            variant="outline"
          />

          {/* Error message for general password errors */}
          {errors.general && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded border border-red-200 dark:border-red-800/30">
              {errors.general}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isPasswordSubmitting}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              isPasswordSubmitting 
                ? 'cursor-not-allowed bg-gray-400 dark:bg-slate-600 text-white' 
                : 'cursor-pointer bg-green-500 hover:bg-green-600 text-white hover:scale-[1.02]'
            }`}
          >
            {isPasswordSubmitting ? 'Processing...' : 'Update Password'}
          </button>
        </form>
      </div>

      {/* Notification Settings */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-slate-100">Notification Preferences</h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <label className="flex items-center gap-2 text-gray-700 dark:text-slate-300">
            <input 
              type="checkbox" 
              name="email" 
              checked={notifications.email} 
              onChange={handleNotificationChange} 
              className="w-4 h-4 text-primary-2 bg-gray-100 dark:bg-slate-700 border-gray-300 dark:border-slate-600 rounded focus:ring-primary-2 focus:ring-2" 
            />
            Email Notifications
          </label>
          <label className="flex items-center gap-2 text-gray-700 dark:text-slate-300">
            <input 
              type="checkbox" 
              name="sms" 
              checked={notifications.sms} 
              onChange={handleNotificationChange} 
              className="w-4 h-4 text-primary-2 bg-gray-100 dark:bg-slate-700 border-gray-300 dark:border-slate-600 rounded focus:ring-primary-2 focus:ring-2" 
            />
            SMS Notifications
          </label>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;