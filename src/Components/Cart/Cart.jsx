import { useContext, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import emptyCartImg from "../../assets/images/emptycart.png"; // Adjust the path based on your structure


export default function Cart() {
  const { cart, updateProductCountToCart, deleteProductCart, getProductToCart } =
    useContext(CartContext);

  useEffect(() => {
    getProductToCart();
  }, [getProductToCart]);

  return (
    <>
      <h2 className="text-3xl font-bold text-center my-8 text-main">Your Shopping Cart</h2>
  
      {cart ? (
        cart.data.products.length > 0 ? (
          <div className="relative overflow-hidden rounded-lg shadow-md p-6 bg-white">
            {/* Table for Desktop */}
            <div className="hidden md:block overflow-x-auto">
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
                    <tr key={index} className="bg-white border-b hover:bg-gray-50 transition duration-200">
                      <td className="p-4">
                        <img src={item.product.imageCover} alt={item.product.title} className="w-20 h-20 object-cover rounded-lg" />
                      </td>
                      <td className="px-6 py-4 font-semibold">{item.product.title}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            onClick={item.count > 1 ? () => updateProductCountToCart(item.product.id, item.count - 1) : () => deleteProductCart(item.product.id)}
                            className="p-1 h-8 w-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200"
                          >
                            <svg className="w-4 h-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                            </svg>
                          </button>
                          <span className="mx-3 px-3 py-1 bg-gray-100 text-gray-800 border border-gray-300 rounded-md">{item.count}</span>
                          <button
                            onClick={() => updateProductCountToCart(item.product.id, item.count + 1)}
                            className="p-1 h-8 w-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200"
                          >
                            <svg className="w-4 h-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {item.price * item.count} EGP
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteProductCart(item.product.id)}
                          className="text-white bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 transition duration-200"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
  
            {/* Mobile Layout */}
            <div className="md:hidden space-y-6">
              {cart.data.products.map((item, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg flex flex-col items-center shadow">
                  <img src={item.product.imageCover} alt={item.product.title} className="w-32 h-32 object-cover rounded-lg mb-2" />
                  <h2 className="text-lg font-semibold">{item.product.title}</h2>
                  <span className="text-gray-700">{item.price * item.count} EGP</span>
  
                  <div className="flex items-center mt-2">
                    <button
                      onClick={item.count > 1 ? () => updateProductCountToCart(item.product.id, item.count - 1) : () => deleteProductCart(item.product.id)}
                      className="p-1 h-8 w-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200"
                    >
                      <svg className="w-4 h-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                      </svg>
                    </button>
                    <span className="mx-3 px-3 py-1 bg-gray-100 text-gray-800 border border-gray-300 rounded-md">{item.count}</span>
                    <button
                      onClick={() => updateProductCountToCart(item.product.id, item.count + 1)}
                      className="p-1 h-8 w-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200"
                    >
                      <svg className="w-4 h-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
  
                  <button
                    onClick={() => deleteProductCart(item.product.id)}
                    className="mt-3 text-white bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 transition duration-200"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
  
            {/* Total Price & Checkout Button */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-8">
              <h3 className="text-lg font-semibold mb-4 md:mb-0">
                Total Price: {cart.data.totalCartPrice} EGP
              </h3>
              <Link to={"/checkout"}>
                <button className="bg-main text-white text-sm py-2 px-4 rounded-lg">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-8 min-h-[500px]">
          <img src={emptyCartImg} alt="Empty Cart" className="w-48 h-48 object-contain" />
          <h2 className="mt-4 text-lg font-semibold text-gray-700">Your cart is empty</h2>
        </div>
        

        )
      ) : (
        <Loading />
      )}
    </>
  );
  
}
