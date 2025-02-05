/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function Register() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserToken } = useContext(UserContext);

  async function register(values) {
    try {
      setLoading(true);
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
      setLoading(false);
      localStorage.setItem('userToken', data.token);
      setUserToken(data.token);
      navigate('/home');
    } catch (err) {
      setApiError(err.response.data.message);
      setLoading(false);
    }
  }

  const schema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(50, 'Name must be at most 50 characters'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password is required'),
    phone: Yup.string()
      .matches(/^[0-9]+$/, 'Phone number must be a number')
      .required('Phone is required'),
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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-main-700 mb-6">Register</h2>
        {apiError && <div className="text-red-500 text-sm mb-4">{apiError}</div>}
        <form onSubmit={formik.handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main-500 focus:border-main-500"
            />
            {formik.errors.name && formik.touched.name && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main-500 focus:border-main-500"
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main-500 focus:border-main-500"
            />
            {formik.errors.password && formik.touched.password && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            )}
          </div>

          {/* Re-enter Password Field */}
          <div className="mb-4">
            <label htmlFor="rePassword" className="block text-sm font-medium text-gray-700">Re-enter Password</label>
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main-500 focus:border-main-500"
            />
            {formik.errors.rePassword && formik.touched.rePassword && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.rePassword}</div>
            )}
          </div>

          {/* Phone Field */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main-500 focus:border-main-500"
            />
            {formik.errors.phone && formik.touched.phone && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            {loading ? (
              <button
                type="button"
                className="bg-main-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center"
              >
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Loading...
              </button>
            ) : (
              <button
                type="submit"
                className="bg-main-600 hover:bg-main-700 text-white font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Register
              </button>
            )}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-main-600 hover:underline text-sm"
            >
              Already have an account? Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
