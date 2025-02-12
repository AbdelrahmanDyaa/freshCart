/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function Login() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUserToken } = useContext(UserContext);
  const navigate = useNavigate();

  async function login(values) {
    try {
      setLoading(true);
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
      localStorage.setItem('userToken', data.token);
      setUserToken(data.token);
      navigate('/home');
    } catch (err) {
      setApiError(err.response.data.message);
      setLoading(false);
    }
  }

  const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: login,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-main">Login</h2>

        {apiError && <div className="text-red-500 text-sm">{apiError}</div>}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`block w-full px-4 py-2 text-sm text-gray-900 bg-gray-100 border ${formik.errors.email && formik.touched.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-main-600 focus:outline-none`}
              placeholder="Enter Your Email"
            />
            {formik.errors.email && formik.touched.email && (
              <span className="text-red-500 text-xs">{formik.errors.email}</span>
            )}
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`block w-full px-4 py-2 text-sm text-gray-900 bg-gray-100 border ${formik.errors.password && formik.touched.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-main-600 focus:outline-none`}
              placeholder="Enter Your Password"
            />
            {formik.errors.password && formik.touched.password && (
              <span className="text-red-500 text-xs">{formik.errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-2 text-white bg-main-700 hover:bg-main-800 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-main-600 focus:ring-offset-1 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <i className="fas fa-spinner fa-spin mr-2"></i>Loading...
              </span>
            ) : (
              'Login'
            )}
          </button>

          <p className="text-sm text-gray-500 text-center">
            Don’t have an account?{' '}
            <Link to="/" className="text-main-700 hover:underline">Register here</Link>
          </p>

          <p className="text-sm text-gray-500 text-center">
            Forgot your password?{' '}
            <Link to="/forgotpassword" className="text-main-700 hover:underline"  onClick={() => console.log('Navigating to forgot password')}>Reset here</Link>

          </p>
        </form>
      </div>
    </div>
  );
}
