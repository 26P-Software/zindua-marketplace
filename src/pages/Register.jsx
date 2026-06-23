import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

// 1. Updated Validation Schema
const schema = yup.object().shape({
  name: yup.string().required('Full name is required').min(3, 'Name too short'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 chars').required('Password required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password')
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    // Note: We only send necessary data to the backend
    const { name, email, password } = data;
    const result = await dispatch(registerUser({ name, email, password }));
    
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-[#fe3448]">Create Account</h2>
        
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-[#757575]">Full Name</label>
            <input {...register('name')} className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#fe3448] outline-none" />
            <p className="text-red-500 text-xs mt-1">{errors.name?.message}</p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#757575]">Email</label>
            <input {...register('email')} className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#fe3448] outline-none" />
            <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#757575]">Password</label>
            <input type="password" {...register('password')} className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#fe3448] outline-none" />
            <p className="text-red-500 text-xs mt-1">{errors.password?.message}</p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-[#757575]">Confirm Password</label>
            <input type="password" {...register('confirmPassword')} className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-[#fe3448] outline-none" />
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword?.message}</p>
          </div>

          <button 
            disabled={loading} 
            className="w-full bg-[#fe3448] text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-all disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>       
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          <p className="text-center text-sm text-[#757575] mt-4">
            Already have an account? <span onClick={() => navigate('/login')} className="text-[#fe3448] font-medium cursor-pointer hover:underline">Sign In</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;