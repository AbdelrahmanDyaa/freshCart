/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';


export default function Checkout() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { cart } = useContext(CartContext);

  

  async function handleCheckout(shippingAddress) {
    try {
      setLoading(true);
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:5173`, {
       shippingAddress
       }
       ,
        {
          headers: {
           token: localStorage.getItem('userToken') || '',
          },
        }
      )
       ;

      console.log(data); 
      toast.success('Redirecting to payment gateway...');
      location.href = data.session.url;
      
    } catch (err) {
      setApiError(err.response.data.message);
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      city: '',
      details: '',
      phone: '',
    },
    onSubmit: handleCheckout,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Checkout</h2>

        {apiError && <div className="text-red-500 text-sm">{apiError}</div>}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              name="city"
              id="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`block w-full px-4 py-2 text-sm text-gray-900 bg-gray-100 border ${formik.errors.city && formik.touched.city ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-main-600 focus:outline-none`}
              placeholder="Enter Your City"
            />
          </div>

          <div className="relative">
            <input
              type="text"
              name="details"
              id="details"
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`block w-full px-4 py-2 text-sm text-gray-900 bg-gray-100 border ${formik.errors.details && formik.touched.details ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-main-600 focus:outline-none`}
              placeholder="Enter Your Details"
            />
          </div>

          <div className="relative">
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`block w-full px-4 py-2 text-sm text-gray-900 bg-gray-100 border ${formik.errors.phone && formik.touched.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-main-600 focus:outline-none`}
              placeholder="Enter Your Phone Number"
            />
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
              'Proceed to Checkout'
            )}
          </button>

         
        </form>
      </div>
    </div>
  );
}
