import { useContext, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, updateProductCountToCart, deleteProductCart, getProductToCart } =
    useContext(CartContext);

  useEffect(() => {
    getProductToCart(); // Ensure cart is fetched whenever the component is loaded or user is logged in
  }, [getProductToCart]); // This effect runs only once when the component is mounted

  return (
    <>
      <h2 className="text-3xl font-bold text-center my-8">Your Shopping Cart</h2>

      {cart ? (
        <div className="relative overflow-x-auto rounded-lg shadow-md p-6 bg-white">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-gray-100 text-gray-700">
              <tr>
                <th scope="col" className="px-6 py-4">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-4">Product</th>
                <th scope="col" className="px-6 py-4">Quantity</th>
                <th scope="col" className="px-6 py-4">Total Price</th>
                <th scope="col" className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.data.products.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b hover:bg-gray-50 transition duration-200"
                >
                  {/* Product Image */}
                  <td className="p-4">
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </td>
                  {/* Product Name */}
                  <td className="px-6 py-4 font-semibold">{item.product.title}</td>
                  {/* Quantity Controls */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        onClick={
                          item.count > 1
                            ? () =>
                                updateProductCountToCart(
                                  item.product.id,
                                  item.count - 1
                                )
                            : () => deleteProductCart(item.product.id)
                        }
                        className="p-1 h-8 w-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200"
                      >
                        <svg
                          className="w-4 h-4 text-gray-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <span className="mx-3 px-3 py-1 bg-gray-100 text-gray-800 border border-gray-300 rounded-md">
                        {item.count}
                      </span>
                      <button
                        onClick={() =>
                          updateProductCountToCart(item.product.id, item.count + 1)
                        }
                        className="p-1 h-8 w-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200"
                      >
                        <svg
                          className="w-4 h-4 text-gray-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  {/* Total Price */}
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {item.price * item.count} EGP
                  </td>
                  {/* Remove Button */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteProductCart(item.product.id)}
                      className="text-white hover:text-red-600 font-semibold transition duration-200"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-8">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mt-4">Total Price: {cart.data.totalCartPrice} EGP</h3>
            </div>
            <Link to={"/checkout"}>
              <button className="bg-main text-white text-sm py-2 px-4 rounded-lg mt-4">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
