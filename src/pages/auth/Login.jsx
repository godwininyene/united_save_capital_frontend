import { Link, useNavigate ,useSearchParams} from "react-router-dom";
import { useState } from "react";
import axios from "../../lib/axios";
const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const[searchParams, setSearchParams] = useSearchParams(); 
  let pathname = searchParams.get("redirectTo")||null
  const message = searchParams.get("message")|| null;
  const navigate = useNavigate()
  const[error, setError] = useState();
  const [formData, setFormData] = useState({
    email:'',
    password: '',
  });

  const handleChange = e =>{
    const{name, value} = e.target;
    setFormData({...formData, [name]: value})
  }

  const submit = async(e) => {
    e.preventDefault();
    let goTo;
    setIsSubmitting(true);
    try {
      const response = await axios.post('api/v1/users/login', formData);
      if(response.data.status=='success'){
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        if(response.data.data.user.role === 'user'){
            goTo = pathname || '/account/user/dashboard' 
        }
        if(response.data.data.user.role === 'admin'){
            goTo = pathname || '/account/admin/dashboard'
        }
        navigate(goTo)
      }
        
    } catch (err) {
      // Extract errors from the backend response
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
        console.log(err.response.data.message);
      } else {
        setError('No response received from the server.');
        console.log('Unexpected Error:', err);
      }
    } finally {
      setIsSubmitting(false);
    }

};

  return (
  
    <div className="relative w-full max-w-md mx-auto px-4 lg:px-8 py-4 border  border-gray-300 rounded-lg bg-white/20">
      {/* Login Box */}
      <div className="relative z-10 text-white text-center">
          
        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <Link to='/account/login' className="text-lg font-semibold border-b-2 border-white pb-1 px-3 cursor-pointer">
            SIGN IN
          </Link>
          <Link to='/account/register' className="text-lg font-semibold text-gray-400 pb-1 px-3 cursor-pointer">
            SIGN UP
          </Link>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={submit}>
        {message && <h2 className="text-[#cc0000]">{message}</h2>}
        {error && <div className="mb-2 font-medium text-sm text-red-600">{error}</div>}
          <div className="text-left">
            <label className="block text-sm font-medium mb-1 text-gray-300">EMAIL</label>
            <input
              placeholder="Enter your email"
              type="email"
              name={'email'}
              value={formData['email' || " "]}
              onChange={handleChange}
              className="w-full py-2 px-3 rounded-md bg-[linear-gradient(rgba(255,255,255,0.10),rgba(255,255,255,0.10))] transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-primary-2"
            />
          </div>

          <div className="text-left">
            <label className="block text-sm font-medium mb-1 text-gray-300">PASSWORD</label>
            <input
              type="password"
              placeholder="Enter your password"
              name={'password'}
              value={formData['password' || " "]}
              onChange={handleChange}
              className="w-full py-2 px-3 rounded-md bg-[linear-gradient(rgba(255,255,255,0.10),rgba(255,255,255,0.10))] transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-primary-2"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Keep me signed in</span>
            </div>
          </div>

          <button
            type="submit"
           
            className={`w-full bg-primary-2 hover:bg-primary-3 text-white cursor-pointer py-2 rounded-md transition-all duration-all ${
              isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-primary-2 hover:brightness-110"
            }`}
            disabled={isSubmitting}
          >
             {isSubmitting ? "Processing..." : "LOGIN"}
          </button>

          <div className="h-[1px] w-full bg-gray-200 mt-7"></div>

          <p className="text-sm text-gray-400 mt-4 cursor-pointer hover:underline">
            Forgot Password?
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
