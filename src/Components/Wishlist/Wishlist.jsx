import { useContext, useEffect } from "react";
import { WishlistContext } from "../../Context/wishlistContext";
import { CartContext } from "../../Context/CartContext";

export default function WishlistPage() {
  const { wishlist, removeProductFromWishlist, getWishlistProducts } = useContext(WishlistContext);
  const { addProductToCart } = useContext(CartContext);

 
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getWishlistProducts(); 
    }
  }, [getWishlistProducts]); 

  if (!wishlist || wishlist.length === 0) {
    return (
      <h2 className="text-2xl text-center mt-8 text-gray-700">
        Your wishlist is empty
      </h2>

    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Your Wishlist
      </h2>
      <div className="space-y-8">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-xl overflow-hidden flex items-center space-x-6 p-6 hover:shadow-2xl transition-shadow duration-300"
          >
           
            <div className="flex-shrink-0 w-32 h-32">
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

          
            <div className="flex-1">
              <h3 className="text-sm text-gray-500 mb-1">{product.category.name}</h3>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {product.title}
              </h2>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span className="text-gray-900 font-bold">{product.price} EGP</span>
                <span className="flex items-center">
                  <i className="fas fa-star text-yellow-400 mr-1"></i>
                  {product.ratingsAverage}
                </span>
              </div>
            </div>

            <div className="space-x-4">
              <button
                onClick={() => removeProductFromWishlist(product.id)}
                className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition-colors"
              >
                <i className="fas fa-heart-broken mr-2"></i> Remove
              </button>
              <button
                onClick={() => addProductToCart(product.id)}
                className="bg-main text-white py-2 px-6 rounded-full hover:bg-main-dark transition-colors"
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
