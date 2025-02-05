import { useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/wishlistContext'; // Import WishlistContext
import { useQuery } from '@tanstack/react-query';

export default function RecentProducts() {
  const { addProductToCart } = useContext(CartContext);
  const { wishlist, addProductToWishlist, removeProductFromWishlist } =
    useContext(WishlistContext);

  function getProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

 
  const wishlistArray =
    Array.isArray(wishlist) ? wishlist.map((item) => item.id) : [];

  return (
    <>
      <h2 className="text-3xl font-bold text-center mt-8">Recent Products</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap py-8 gap-6 justify-center">
          {data?.data.data.map((product) => (
            <div
              key={product.id}
              className="w-[220px] bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Link to={`/productdetails/${product.id}`}>
                <div className="h-[220px] overflow-hidden rounded-t-lg">
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-main font-medium text-sm mb-1">
                    {product.category.name}
                  </h3>
                  <h2 className="text-lg font-semibold mb-2">
                    {product.title.split(' ', 2).join(' ')}
                  </h2>
                  <div className="flex justify-between items-center text-sm text-gray-700">
                    <span>{product.price} EGP</span>
                    <span>
                      <i className="fas fa-star text-yellow-400"></i>{' '}
                      {product.ratingsAverage}
                    </span>
                  </div>
                </div>
              </Link>

             
              <div className="flex justify-between items-center mt-2 px-4">
               
                <button
                  onClick={() => addProductToCart(product.id)}
                  className="bg-main text-white text-sm py-1.5 px-4 rounded-lg"
                >
                  <i className="fas fa-cart-plus"></i> Add to Cart
                </button>

                
                {wishlistArray.includes(product.id) ? (
                  <button
                    onClick={() => removeProductFromWishlist(product.id)}
                    className="bg-red-500 text-white text-sm p-2 rounded-full ml-2"
                  >
                    <i className="fas fa-heart"></i>
                  </button>
                ) : (
                  <button
                    onClick={() => addProductToWishlist(product.id)}
                    className="bg-gray-300 text-gray-800 text-sm p-2 rounded-full ml-2 hover:bg-red-500 hover:text-white"
                  >
                    <i className="fas fa-heart"></i>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
