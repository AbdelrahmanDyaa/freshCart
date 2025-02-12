import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import Slider from "react-slick";
import Loading from '../Loading/Loading';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/wishlistContext'; 

export default function ProductDetails() {
  let { addProductToCart } = useContext(CartContext);
  let { wishlist, addProductToWishlist, removeProductFromWishlist } = useContext(WishlistContext); 

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  let { id } = useParams();

  async function getProduct(productId) {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
      setProduct(data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching product details', err);
      setLoading(false);
    }
  }

  useEffect(() => {
    getProduct(id);
  }, [id]);

  const isInWishlist = wishlist?.some((item) => item.id === product.id);

  return (
    <>
      <h2 className="text-3xl font-bold text-center my-8 text-main">Product Details</h2>

      {loading ? <Loading /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-8 items-center">
          
          {/* Image Slider with Fixed Container */}
          <div className="relative w-full max-w-lg mx-auto">
            <Slider {...settings} className="rounded-lg overflow-hidden">
              {product.images?.map((image, index) => (
                <div key={index} className="flex justify-center items-center">
                  <img 
                    src={image} 
                    alt={product.title} 
                    className="max-h-[400px] w-auto object-contain"
                  />
                </div>
              ))}
            </Slider>

            {/* Wishlist button */}
            <div
              onClick={() => isInWishlist ? removeProductFromWishlist(product.id) : addProductToWishlist(product.id)}
              className={`absolute top-4 right-4 p-2 ${isInWishlist ? 'text-red-500' : 'text-gray-600'} hover:text-red-600 cursor-pointer text-2xl`}
            >
              <i className={`fas fa-heart`}></i>
            </div>
          </div>

          {/* Product Details */}
          <div className="text-center md:text-left p-4">
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <h3 className="text-gray-900 mt-2 text-lg font-semibold">{product.category?.name}</h3>

            <div className="flex justify-between items-center mt-4 text-lg font-semibold">
              <span className="text-green-600">{product.price} EGP</span>
              <span className="flex items-center text-yellow-500">
                <i className="fas fa-star mr-1"></i>{product.ratingsAverage}
              </span>
            </div>

            {/* Add to Cart button */}
            <button
              onClick={() => addProductToCart(product.id)}
              className="w-full md:w-auto bg-main text-white py-2 px-6 rounded-lg mt-6 text-lg"
            >
              <i className="fas fa-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}
