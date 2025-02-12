import { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function Register() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserToken, setUserName } = useContext(UserContext);

  async function register(values) {
    try {
      setLoading(true);
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
      setLoading(false);
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userName', data.user.name);
      setUserToken(data.token);
      setUserName(data.user.name);
      navigate('/home');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Registration failed');
      setLoading(false);
    }
  }

  const schema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters').max(50, 'Name must be at most 50 characters'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    rePassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Password is required'),
    phone: Yup.string().matches(/^[0-9]+$/, 'Phone number must be a number').required('Phone is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema: schema,
    onSubmit: register,
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-green-600 flex items-center justify-center">
          <i className="fa-solid fa-user-plus mr-2"></i> Register
        </h2>
        {apiError && <p className="text-red-600 text-center">{apiError}</p>}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-3 py-2 border rounded-md"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-600 text-sm">{formik.errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-600 text-sm">{formik.errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 border rounded-md"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-600 text-sm">{formik.errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Re-enter Password</label>
            <input
              type="password"
              name="rePassword"
              className="w-full px-3 py-2 border rounded-md"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
            />
            {formik.touched.rePassword && formik.errors.rePassword && (
              <p className="text-red-600 text-sm">{formik.errors.rePassword}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              className="w-full px-3 py-2 border rounded-md"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-600 text-sm">{formik.errors.phone}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}
