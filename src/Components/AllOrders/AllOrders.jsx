import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import noOrder from "../../assets/images/Empty1.svg";

export default function Allorders() {
  const [userOrders, setuserOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      try {
        const { id } = jwtDecode(token);
        getOrders(id);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      console.warn("No user token found");
    }
  }, []);

  async function getOrders(id) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
      setuserOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setuserOrders([]);
    }
  }

  const handleGoHome = () => {
    navigate('/home');
  };

  return (
    <div className="container my-5">
      {userOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-8 min-h-[600px]">
          {/* SVG Image for No Orders */}
          <img
            src={noOrder}
            alt="No Orders Yet"
            className="w-48 h-48 mb-4"
          />
          <h2 className="mt-4 text-xl font-semibold text-gray-700">
            It seems you don’t have any orders yet.
          </h2>
          <button
            onClick={handleGoHome}
            className="mt-6 bg-green-600 text-white font-semibold py-2 px-6 rounded-md shadow hover:bg-green-700 transition duration-200"
          >
            Go to Home
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-center mt-8 text-main">Your Orders</h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
            <div className="space-y-6">
              {userOrders.map((order, idx) => (
                <div
                  key={idx}
                  className="bg-white border rounded-lg shadow-lg p-6 mb-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-gray-800">
                      <p>
                        <strong>Order ID:</strong> {order.id}
                      </p>
                      <p>
                        <strong>Total Cost:</strong> {order.totalOrderPrice} EGP
                      </p>
                    </div>
                    <div
                      className={`px-4 py-2 rounded-full text-white font-bold ${
                        order.isDelivered ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    >
                      {order.isDelivered ? "Delivered" : "Pending"}
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-lg font-medium text-gray-600">
                      <strong>Payment Method:</strong> {order.paymentMethodType}
                    </p>
                    <div className="mt-2">
                      <p className="text-lg font-medium text-gray-600">
                        <strong>Shipping Info:</strong>
                      </p>
                      <p>Phone: {order.shippingAddress?.phone || "N/A"}</p>
                      <p>City: {order.shippingAddress?.city || "N/A"}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Products
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      {order.cartItems?.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md"
                        >
                          {/* Product Image */}
                          <img
                            src={item?.product?.imageCover}
                            alt={item?.product?.title}
                            className="w-16 h-16 object-cover rounded-md mr-4"
                          />
                          {/* Product Details */}
                          <div>
                            <p className="text-lg font-semibold text-gray-800">
                              {item?.product?.title}
                            </p>
                            <p className="text-gray-600">
                              Count: {item?.count}
                            </p>
                            <p className="text-gray-800 font-bold mt-1">
                              Price: {item?.price} EGP
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
