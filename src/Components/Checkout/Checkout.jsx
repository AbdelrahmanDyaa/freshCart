/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function Checkout() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { cart } = useContext(CartContext);

  async function handleCheckout(shippingAddress) {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=https://abdelrahmandyaa.github.io/freshcart/#`,
        { shippingAddress },
        {
          headers: {
            token: localStorage.getItem("userToken") || "",
          },
        }
      );

      toast.success("Redirecting to payment gateway...");
      location.href = data.session.url;
    } catch (err) {
      setApiError(err.response.data.message);
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      city: "",
      details: "",
      phone: "",
    },
    onSubmit: handleCheckout,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Secure Checkout
        </h2>

        {apiError && (
          <div className="flex items-center gap-2 text-red-600 bg-red-100 p-3 rounded-lg mt-4">
            <i className="fas fa-exclamation-circle"></i>
            <span>{apiError}</span>
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="mt-6 space-y-6">
          <div>
            <label className="text-gray-600 text-sm font-medium block mb-2">
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`block w-full px-4 py-3 text-gray-900 bg-gray-100 border ${
                formik.errors.city && formik.touched.city
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-main-600 focus:outline-none`}
              placeholder="Enter Your City"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm font-medium block mb-2">
              Address Details
            </label>
            <input
              type="text"
              name="details"
              id="details"
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`block w-full px-4 py-3 text-gray-900 bg-gray-100 border ${
                formik.errors.details && formik.touched.details
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-main-600 focus:outline-none`}
              placeholder="Enter Your Address Details"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm font-medium block mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`block w-full px-4 py-3 text-gray-900 bg-gray-100 border ${
                formik.errors.phone && formik.touched.phone
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-main-600 focus:outline-none`}
              placeholder="Enter Your Phone Number"
            />
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-3 text-white text-lg bg-main-600 hover:bg-main-700 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-main-500 focus:ring-offset-1 ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <i className="fas fa-spinner fa-spin mr-2"></i> Processing...
              </span>
            ) : (
              "Proceed to Payment"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
