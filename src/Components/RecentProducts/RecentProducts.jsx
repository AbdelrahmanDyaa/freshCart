import { useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/wishlistContext';
import { useQuery } from '@tanstack/react-query';

export default function RecentProducts() {
  const { addProductToCart } = useContext(CartContext);
  const { wishlist, addProductToWishlist, removeProductFromWishlist } = useContext(WishlistContext);

  function getProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  const { data, isLoading } = useQuery({ queryKey: ['products'], queryFn: getProducts });
  const wishlistArray = Array.isArray(wishlist) ? wishlist.map((item) => item.id) : [];

  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">Recent Products</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {data?.data.data.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <Link to={`/productdetails/${product.id}`} className="block">
                <div className="relative overflow-hidden rounded-t-lg aspect-[3/4]">
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-main font-medium text-sm uppercase tracking-wide mb-1">
                    {product.category.name}
                  </h3>
                  <h2 className="text-lg font-semibold text-gray-900 truncate mb-2">
                    {product.title.split(' ', 2).join(' ')}
                  </h2>
                  <div className="flex justify-between items-center text-gray-700 text-sm">
                    <span className="font-semibold">{product.price} EGP</span>
                    <span className="flex items-center">
                      <i className="fas fa-star text-yellow-400 mr-1"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </div>
              </Link>
              <div className="flex justify-between items-center px-5 pb-5">
                <button
                  onClick={() => addProductToCart(product.id)}
                  className="flex items-center bg-main text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all"
                >
                  <i className="fas fa-cart-plus mr-2"></i> Add to Cart
                </button>
                {wishlistArray.includes(product.id) ? (
                  <button
                    onClick={() => removeProductFromWishlist(product.id)}
                    className="bg-red-500 text-white p-2 rounded-full transition-all hover:bg-red-600"
                  >
                    <i className="fas fa-heart"></i>
                  </button>
                ) : (
                  <button
                    onClick={() => addProductToWishlist(product.id)}
                    className="bg-gray-300 text-gray-800 p-2 rounded-full transition-all hover:bg-red-500 hover:text-white"
                  >
                    <i className="fas fa-heart"></i>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
