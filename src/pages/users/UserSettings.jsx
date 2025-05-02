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
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">User Settings</h2>

      {/* Profile Settings */}
      <div className="mb-6 border-b pb-6">
        <h3 className="text-lg font-semibold mb-3">Profile Information</h3>
        {profileSuccess && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {profileSuccess}
          </div>
        )}
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <InputField
            defaultValue={user?.fullname || 'N/A'}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            name={'fullname'}
            error={errors.fullname}
          />
          <InputField
            defaultValue={user?.email || 'N/A'}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            name={'email'}
            error={errors.email}
          />
          <InputField
            defaultValue={user?.phone || 'N/A'}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            name={'phone'}
            error={errors.phone}
          />
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100 dark:border-slate-700 mb-3">
            <img 
              src={`${base_url}/${avatarPreview}`} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <label className="cursor-pointer text-blue-600 dark:text-blue-400 hover:underline mb-2">
            Change Photo
            <InputField
              type="file" 
              classNames="hidden" 
              accept="image/*"
              name={'photo'}
              onChange={handleAvatarChange}
              isRequired={false}
              error={errors.photo}
            />
          </label>
          <div className="mt-3">
            <button 
              disabled={isSubmitting}
              type="submit" 
              className={`text-white px-4 py-2 rounded ${isSubmitting ? 'cursor-not-allowed bg-slate-400' : 'cursor-pointer bg-blue-500'}`}
            >
              {isSubmitting ? 'Processing...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>

      {/* Password Change */}
      <div className="mb-6 border-b pb-6">
        <h3 className="text-lg font-semibold mb-3">Change Password</h3>
        {passwordSuccess && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {passwordSuccess}
          </div>
        )}
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <InputField
            type="password"
            value={password.current}
            onChange={(e) => setPassword({ ...password, current: e.target.value })}
            placeholder="Current Password"
            required
            error={errors.passwordCurrent}
          />
          <InputField
            type="password"
            value={password.new}
            onChange={(e) => setPassword({ ...password, new: e.target.value })}
            placeholder="New Password"
            required
            error={errors.password}
          />
          <InputField
            type="password"
            value={password.confirm}
            onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
            placeholder="Confirm New Password"
            required
            error={errors.passwordConfirm}
          />
          <button 
            type="submit" 
            disabled={isPasswordSubmitting}
            className={`text-white px-4 py-2 rounded ${isPasswordSubmitting ? 'cursor-not-allowed bg-slate-400' : 'cursor-pointer bg-green-500'}`}
          >
            {isPasswordSubmitting ? 'Processing...' : 'Update Password'}
          </button>
        </form>
      </div>

      {/* Notification Settings */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Notification Preferences</h3>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input type="checkbox" name="email" checked={notifications.email} onChange={handleNotificationChange} className="mr-2" />
            Email Notifications
          </label>
          <label className="flex items-center">
            <input type="checkbox" name="sms" checked={notifications.sms} onChange={handleNotificationChange} className="mr-2" />
            SMS Notifications
          </label>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;