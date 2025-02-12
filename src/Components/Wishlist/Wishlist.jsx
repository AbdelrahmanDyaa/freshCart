import { useContext, useEffect } from "react";
import { WishlistContext } from "../../Context/wishlistContext";
import { CartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";

export default function WishlistPage() {
  const { wishlist, removeProductFromWishlist, getWishlistProducts } = useContext(WishlistContext);
  const { addProductToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getWishlistProducts();
    }
  }, [getWishlistProducts]);

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <i className="fa-solid fa-heart-circle-xmark fa-4x text-red-400"></i>
          <h2 className="mt-4 text-xl font-semibold text-gray-700">
            Your wishlist is empty.
          </h2>
        </div>
      </div>
    );
  }
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-main">
        Your Wishlist
      </h2>

      <div className="space-y-8">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row items-center md:items-start p-6 hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Product Image & Details */}
            <div
              className="flex items-center w-full md:w-auto flex-grow cursor-pointer"
              onClick={() => navigate(`/productdetails/${product.id}`)}
            >
              {/* Product Image */}
              <div className="w-32 h-32 flex-shrink-0">
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 ml-4 text-center md:text-left">
                <h3 className="text-sm text-gray-500 mb-1">{product.category.name}</h3>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h2>
                <div className="flex justify-center md:justify-start items-center text-sm text-gray-600">
                  <span className="text-gray-900 font-bold">{product.price} EGP</span>
                  <span className="flex items-center ml-4">
                    <i className="fas fa-star text-yellow-400 mr-1"></i>
                    {product.ratingsAverage}
                  </span>
                </div>
              </div>
            </div>

            {/* Buttons - Positioned Right on Desktop */}
            <div className="mt-4 md:mt-0 md:ml-auto flex flex-col md:flex-row md:space-x-4">
              <button
                onClick={() => removeProductFromWishlist(product.id)}
                className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition-colors w-full md:w-auto"
              >
                <i className="fas fa-heart-broken mr-2"></i> Remove
              </button>
              <button
                onClick={() => addProductToCart(product.id)}
                className="bg-main text-white py-2 px-6 rounded-full hover:bg-main-dark transition-colors w-full md:w-auto mt-2 md:mt-0"
              >
                <i className="fas fa-cart-plus mr-2"></i> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
