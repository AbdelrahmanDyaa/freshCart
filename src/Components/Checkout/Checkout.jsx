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
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=https://abdelrahmandyaa.github.io/freshcart/#/`,
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
      setApiError(err.response?.data?.message || "Something went wrong!");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
          Secure Checkout
        </h2>
        <p className="text-center text-gray-500 text-sm">
          Enter your shipping details to proceed with payment.
        </p>

        {apiError && (
          <div className="flex items-center gap-2 text-red-700 bg-red-100 p-3 rounded-lg mt-4 border border-red-300">
            <i className="fas fa-exclamation-circle"></i>
            <span>{apiError}</span>
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="mt-6 space-y-5">
          {/* Input Field */}
          {["city", "details", "phone"].map((field, index) => (
            <div key={index}>
              <label className="text-gray-600 text-sm font-medium block mb-2 capitalize">
                {field.replace("_", " ")}
              </label>
              <input
                type={field === "phone" ? "tel" : "text"}
                name={field}
                id={field}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full px-4 py-3 text-gray-900 bg-gray-100 border ${
                  formik.errors[field] && formik.touched[field]
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none`}
                placeholder={`Enter your ${field}`}
              />
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full px-4 py-3 text-white text-lg bg-green-600 hover:bg-green-700 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition-all ${
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
