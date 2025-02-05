/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      {/* Image section */}
      <div className="relative w-full h-60">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-0 transition-opacity duration-300 flex items-center justify-center">
          <Link to={`/productdetails/${product._id}`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300">
              View Details
            </button>
          </Link>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 truncate">{product.name}</h3>
        
        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-semibold text-green-600">{product.price} EGP</p>
        </div>
      </div>
    </div>
  );
}
