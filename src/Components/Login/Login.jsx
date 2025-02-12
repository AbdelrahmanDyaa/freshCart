import { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function Login() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUserToken, setUserName } = useContext(UserContext);
  const navigate = useNavigate();

  async function login(values) {
    try {
      setLoading(true);
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);

      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userName', data.user.name);

      setUserToken(data.token);
      setUserName(data.user.name);

      navigate('/home');
    } catch (err) {
      setApiError(err.response?.data?.message || "Login failed");
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: login,
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-green-600 flex items-center justify-center">
          <i className="fa-solid fa-user-lock mr-2"></i> Login
        </h2>
        {apiError && <p className="text-red-600 text-center">{apiError}</p>}
        <form onSubmit={formik.handleSubmit}>
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
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
