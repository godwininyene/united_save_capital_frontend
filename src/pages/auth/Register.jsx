import { useState, useEffect } from "react";
import { Link,useLocation, useNavigate } from "react-router-dom";
import InputError from "../../components/common/InputError";
import axios from "../../lib/axios";
import LoadingIndicator from "../../components/common/LoadingIndicator";
import { FaUserPlus } from "react-icons/fa";


const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    dob:"",
    gender:"",
    occupation:"",
    country: "",
    zip:"",
    city:"",
    address:"",
    nextKinName: "",
    nextKinEmail:"",
    nextKinPhone:"",
    nextKinRelationship:"",
    nextKinAddress:"",
    currency:"",
    password: "",
    // passportPhoto:"",
    // identityDocument:"",
    confirmPassword: "",
    transactionPin: "",
    keepSignedIn: false,
  });

  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    phone: "",
    dob:"",
    gender:"",
    occupation:"",
    country: "",
    zip:"",
    city:"",
    address:"",
    nextKinName: "",
    nextKinEmail:"",
    nextKinPhone:"",
    nextKinRelationship:"",
    nextKinAddress:"",
    currency:"",
    password: "",
    // passportPhoto:"",
    // identityDocument:"",
    confirmPassword: "",
    transactionPin: "",
    keepSignedIn: false,
})

const [processing, setProcessing] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setProcessing(true)
    const data = new FormData(e.target)
    try {
        const response = await axios.post('api/v1/users/signup', data);
        if (response.data.status === 'success') {
            setIsSuccess(true); // Show success message
            setTimeout(() => {
              navigate('/account/login'); // Redirect after 3 seconds
            }, 3000);
          }
        setProcessing(false)
    } catch (err) {
        // Extract errors from the backend response
        if (err.response && err.response.data.message && err.response.data.errors) {
            const newErrors = {};
            console.log(err.response.data.errors);
           if(Array.isArray(err.response.data.errors)){
            err.response.data.errors.forEach(el => {
                for (let key in el) {
                    newErrors[key] = el[key];
                }
            });
            setErrors(newErrors);

           }else{
            setErrors(err.response.data.errors);
           }
           
        } else {
            setErrors(err);
            console.log('Unexpected Error:', err);
        }
        console.log('Unexpected Error:', err);
    } finally {
        setProcessing(false);
    }
   
};

  const location = useLocation();

  const [countries, loadCountries] = useState([]);

    const fetchCountries = async () => {
        const res = await axios.get('api/v1/countries');
        loadCountries(res.data.data.countries)
    }
    useEffect(() => {
        fetchCountries();
    },[])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 border border-gray-400 rounded-lg bg-white/20">
        <div className="relative z-10 text-white">
            {/* Tabs */}
            <div className="flex justify-center mb-6">
                <Link to='/account/login' className={`text-lg font-semibold ${location.pathname ==='/account/login' ? 'border-b-2 border-white': 'text-gray-400'} pb-1 px-3 cursor-pointer`}>
                    SIGN IN
                </Link>
                <Link to='/account/register' className={`text-lg font-semibold ${location.pathname ==='/account/register' ? 'border-b-2 border-white': 'text-gray-400'} pb-1 px-3 cursor-pointer`}>
                    SIGN UP
                </Link>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <h1 className="font-bold">Personal <span className="text-primary-2">Information:</span></h1>
                {/* Name and Email */}
                <div className="flex flex-col lg:flex-row gap-x-5">
                    <div className="w-full mb-2 lg:mb-0">
                        <label className="block text-sm font-medium text-gray-300">Fullname</label>
                        <input
                            type="text"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            placeholder="Enter your firstname"
                            className="w-full py-2 px-3 rounded-md bg-[linear-gradient(rgba(255,255,255,0.10),rgba(255,255,255,0.10))] transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-primary-2"
                            required
                        />
                        <InputError message={errors.fullname} />
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-300">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email address"
                            className="w-full py-2 px-3 rounded-md bg-[linear-gradient(rgba(255,255,255,0.10),rgba(255,255,255,0.10))] transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-primary-2"
                            required
                        />
                         <InputError message={errors.email} />
                    </div>
                </div>

                {/* Phone & Dob */}
                <div className="flex  flex-col lg:flex-row gap-x-5">
                    <div className="w-full mb-2 lg:mb-0">
                        <label className="block text-sm font-medium text-gray-300">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className="w-full py-2 px-3 rounded-md bg-[linear-gradient(rgba(255,255,255,0.10),rgba(255,255,255,0.10))] transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-primary-2"
                            required
                        />
                         <InputError message={errors.phone} />
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-300">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full py-2 px-3 rounded-md bg-[linear-gradient(rgba(255,255,255,0.10),rgba(255,255,255,0.10))] transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-primary-2"
                            required
                        />
                         <InputError message={errors.dob} />
                    </div>
                </div>

                {/* Gender & Occupation */}
                <div className="flex  flex-col lg:flex-row gap-x-5">
                    <div className="w-full mb-2 lg:mb-0">
                        <label className="block text-sm font-medium text-gray-300">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full py-2 px-3 rounded-md bg-[linear-gradient(rgba(255,255,255,0.10),rgba(255,255,255,0.10))] transition-all duration-300  focus:outline-none  focus:ring-2 focus:ring-primary-2"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male" className="text-black">Male</option>
                            <option value="Female" className="text-black">Female</option>
                        </select>
                        <InputError message={errors.gender} />
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-300">Occupation</label>
                        <input
                            type="text"
                            name="occupation"
                            value={formData.occupation}
                            onChange={handleChange}
                            placeholder="Enter your occupation"
                            className="w-full py-2 px-3 rounded-md bg-[linear-gradient(rgba(255,255,255,0.10),rgba(255,255,255,0.10))] transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-primary-2"
                            required
                        />
                         <InputError message={errors.occupation} />
                    </div>
                </div>

                <hr className="my-7 block border-[0.5px] border-gray-400"/>

                <h1 className="font-bold">Contact <span className="text-primary-2">Information:</span></h1>

                {/* Country, city, & zip code */}
                <div className="flex  flex-col lg:flex-row gap-x-5">
                    <div className="w-full mb-2 lg:mb-0">
                        <label className="block text-sm font-medium text-gray-300">Country</label>
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full py-2 px-3 rounded-md bg-[linear-gradient(rgba(255,255,255,0.10),rgba(255,255,255,0.10))] transition-all duration-300  focus:outline-none  focus:ring-2 focus:ring-primary-2"
                            required
                        >
                            <option defaultValue={``} disabled className="text-black">Select Country</option>
                            {countries.length > 0 && countries.map(country => (
                                <option value={country.name} key={country._id} className="text-black"> { country.name }</option>
                            ))}
                        </select>
                        <InputError message={errors.country} />
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-300">City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Enter zip code"
                            className="w-full py-2 px-3 rounded-md bg-[linear-gradient(rgba(255,255,255,0.10),rgba(255,255,255,0.10))] transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-primary-2"
                            maxLength="4"
                            required
                        />
                        <InputError message={errors.city} />
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-300">Zip Code</label>
                        <input
                            type="text"
                            name="zipcode"
                            value={formData.zipcode}
                            onChange={handleChange}
                            placeholder="Enter zip code"
                            className="w-full py-2 px-3 rounded-md bg-[linear-gradient(rgba(255,255,255,0.10),rgba(255,255,255,0.10))] transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-primary-2"
                            maxLength="4"
                            required
                        />
                        <InputError message={errors.zipcode} />
                    </div>
                </div>

                {/* Address  */}
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-300">Address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your address"
                        className="w-full py-2 px-3 rounded-md bg-[linear-gradient(rgba(255,255,255,0.10),rgba(255,255,255,0.10))] transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-primary-2"
                        required
                    />
                     <InputError message={errors.address} />
                </div>

                <hr className="my-7 block border-[0.5px] border-gray-400"/>

                <h1 className="font-bold">Next of Kin <span className="text-primary-2">Information:</span></h1>

                 {/* Next of kin name, email, and phone */}
                 <div className="flex  flex-col lg:flex-row gap-x-5">
                    <div className="w-full mb-2 lg:mb-0">
                        <label className="block text-sm font-medium text-gray-300">Name</label>
                        <input
                            name="nextKinName"
                            value={formData.nextKinName}
                            onChange={handleChange}
                            placeholder="Enter your next of Kin name"
                            className="w-full py-2 px-3 rounded-md bg-[linear-gradient(rgba(255,255,255,0.10),rgba(255,255,255,0.10))] transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-primary-2"
                            required
                        />
                         <InputError message={errors.nextKinName} />
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-300">Email</label>
                        <input
                            type="email"
                            name="nextKinEmail"
                            value={formData.nextKinEmail}
                            onChange={handleChange}
                            className="w-full py-2 px-3 rounded-md bg-[linear-gradient(rgba(255,255,255,0.10),rgba(255,255,255,0.10))] transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-primary-2"
                            required
                        />
                         <InputError message={errors.nextKinEmail} />
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-300">Phone</label>
                        <input
                            type="tel"
                            name="nextKinPhone"
                            value={formData.nextKinPhone}
                            onChange={handleChange}
                            className="w-full py-2 px-3 rounded-md bg-[linear-gradient(rgba(255,255,255,0.10),rgba(255,255,255,0.10))] transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-primary-2"
                            required
                        />
                        <InputError message={errors.nextKinPhone} />
                    </div>
                </div>

                {/* Next of kin relationship and address */}
                <div className="flex  flex-col lg:flex-row gap-x-5">

                    <div className="w-full mb-2 lg:mb-0">
                        <label className="block text-sm font-medium text-gray-300">Relationship</label>
                        <input
                            name="nextKinRelationship"
                            value={formData.nextKinRelationship}
                            onChange={handleChange}
                            placeholder="Enter your next of Kin name"
                            className="w-full py-2 px-3 rounded-md bg-[linear-gradient(rgba(255,255,255,0.10),rgba(255,255,255,0.10))] transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-primary-2"
                            required
                        />
                        <InputError message={errors.nextKinRelationship} />
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-300">Address</label>
                        <textarea
                            name="nextKinAddress"
                            value={formData.nextKinAddress}
                            onChange={handleChange}
                            placeholder="Enter your address"
                            className="w-full py-2 px-3 rounded-md bg-[linear-gradient(rgba(255,255,255,0.10),rgba(255,255,255,0.10))] transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-primary-2"
                            required
                        />
                        <InputError message={errors.nextKinAddress} />
                    </div>

                </div>

                <hr className="my-7 block border-[0.5px] border-gray-400"/>

                <h1 className="font-bold">Account <span className="text-primary-2">Information:</span></h1>
                {/* Currency, Password, and PasswordConfirm */}
                <div className="flex  flex-col lg:flex-row gap-x-5">

                    <div className="w-full mb-2 lg:mb-0">

                        <label className="block text-sm font-medium text-gray-300">Account Currency</label>
                        <select
                            name="currency"
                            value={formData.currency}
                            onChange={handleChange}
                            className="w-full py-2 px-3 rounded-md bg-[linear-gradient(rgba(255,255,255,0.10),rgba(255,255,255,0.10))] transition-all duration-300  focus:outline-none  focus:ring-2 focus:ring-primary-2"
                            required
                        >
                            <option value="" className="text-black">Select</option>
                            <option value="$" className="text-black">US Dollar</option>
                            <option value="€" className="text-black">Euro</option>
                            <option value="£" className="text-black">Pounds Sterling</option>
                            <option value="RM" className="text-black">Malaysian Ringgit - RM</option>
                            <option value="SGD$" className="text-black">Singapore Dollar</option>
                            <option value="₹" className="text-black">Indian Rupee</option>
                            <option value="Rp" className="text-black">Indonesian Rupiah</option>
                            <option value="AUD$" className="text-black">Australian Dollar</option>
                            <option value="CAD$" className="text-black">Canadian Dollar</option>
                            <option value="₣" className="text-black">CFP Franc</option>
                            <option value="¥" className="text-black">Japanese Yen</option>
                            <option value="¥" className="text-black">Chinese Yen</option>
                            <option value="ا.د" className="text-black">Jordanian Dinar</option>
                            <option value="ك.د" className="text-black">Kuwaiti Dinar</option>
                            <option value="MXN$" className="text-black">Mexican Peso</option>
                            <option value=".ع.ر" className="text-black">Omani Rial</option>
                            <option value="₱" className="text-black">Philippine Peso</option>
                            <option value="ق.ر" className="text-black">Qatari Rial</option>
                            <option value=" ﷼" className="text-black">Saudi Riyal</option>
                            <option value="₩" className="text-black">South Korean Won</option>
                            <option value="฿" className="text-black">Thailand Baht</option>
                            <option value="₫" className="text-black">Vietnam Dong</option>
                        </select>
                        <InputError message={errors.currency} />
                    </div>

                    <div className="w-full mb-2 lg:mb-0">
                        <label className="block text-sm font-medium text-gray-300">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full py-2 px-3 rounded-md bg-[linear-gradient(rgba(255,255,255,0.10),rgba(255,255,255,0.10))] transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-primary-2"
                            required
                        />
                         <InputError message={errors.password} />
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
                        <input
                            type="password"
                            name="passwordConfirm"
                            value={formData.passwordConfirm}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            className="w-full py-2 px-3 rounded-md bg-[linear-gradient(rgba(255,255,255,0.10),rgba(255,255,255,0.10))] transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-primary-2"
                            required
                        />
                        <InputError message={errors.passwordConfirm} />
                    </div>
                </div>
                    
                {/* Transaction PIN */}
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-300">4-Digit Transaction PIN</label>
                    <input
                        type="password"
                        name="transactionPin"
                        value={formData.transactionPin}
                        onChange={handleChange}
                        placeholder="Enter your transaction PIN"
                        className="w-full py-2 px-3 rounded-md bg-[linear-gradient(rgba(255,255,255,0.10),rgba(255,255,255,0.10))] transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-primary-2"
                        maxLength="4"
                        required
                    />
                    <InputError message={errors.transactionPin} />
                </div>


                <hr className="my-7 block border-[0.5px] border-gray-400"/>

                <h1 className="font-bold hidden">KYC <span className="text-primary-2">Verification:</span></h1>

                 {/* passport and document */}
                 {/* <div className="hidden  flex-col lg:flex-row gap-x-5">
                    <div className="w-full mb-2 lg:mb-0">
                        <label className="block text-sm font-medium text-gray-300">Passport Photograph</label>
                        <input
                            type="file"
                            name="passportPhoto"
                            value={formData.passportPhoto}
                            onChange={handleChange}
                            className="w-full py-2 px-3 rounded-md bg-[linear-gradient(rgba(255,255,255,0.10),rgba(255,255,255,0.10))] transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-primary-2"
                            required
                        />
                        <InputError message={errors.passportPhoto} />
                        <p className="text-xs">
                            <span className="font-bold">Accepted File Type:</span> png, jpg, gif (max: 5mb)
                        </p>
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-300">Means of Identification</label>
                        <input
                            type="file"
                            name="identityDocument"
                            value={formData.identityDocument}
                            onChange={handleChange}
                            className="w-full py-2 px-3 rounded-md bg-[linear-gradient(rgba(255,255,255,0.10),rgba(255,255,255,0.10))] transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-primary-2"
                            required
                        />
                        <InputError message={errors.identityDocument} />
                        <p className="text-xs">
                            <span className="font-bold">Accepted Documents:</span> Passport ID, National ID, Bank Statement, Utility Bill
                        </p>
                        
                        <p className="text-xs">
                            <span className="font-bold">Accepted File Type:</span> PDF, png, jpg, gif (max: 5mb)
                        </p>

                    </div>
                </div> */}

                {/* Keep me signed in */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="keepSignedIn"
                        checked={formData.keepSignedIn}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <span>Keep me signed in</span>
                </div>
                {isSuccess && (
                    <div className="mb-4 p-4 bg-green-500/20 border border-green-500 rounded-md text-green-100">
                        <p className="font-semibold">Account created successfully!</p>
                        <p className="text-sm">Redirecting to login page...</p>
                    </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        disabled={processing}
                        type="submit"
                        className=" bg-primary-2 hover:bg-primary-3 cursor-pointer text-white py-2 px-4 inline-flex gap-x-2 rounded-md transition duration-300"
                    >
                        {processing ? <LoadingIndicator size={5} />  : <FaUserPlus className="w-6 h-6"  /> }
                        Create Account
                        
                    </button>

                </div>
               
            </form>
        </div>
    </div>
  );
};

export default Register;
