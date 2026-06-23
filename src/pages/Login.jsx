import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log("Logging in...", data);
    // Add your login thunk dispatch here
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-[#fe3448]">Sign In</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#757575]">Email</label>
            <input {...register('email')} className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#fe3448] outline-none" />
            <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#757575]">Password</label>
            <input type="password" {...register('password')} className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#fe3448] outline-none" />
            <p className="text-red-500 text-xs mt-1">{errors.password?.message}</p>
          </div>

          <button disabled={loading} className="w-full bg-[#fe3448] text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-all disabled:opacity-50">
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
          
          <p className="text-center text-sm text-[#757575] mt-4">
            Don't have an account? <span onClick={() => navigate('/register')} className="text-[#fe3448] font-medium cursor-pointer hover:underline">Register</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;