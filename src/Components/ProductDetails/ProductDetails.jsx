import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Slider from "react-slick";
import Loading from '../Loading/Loading';
import { useContext } from 'react';
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

  // Fetch the product details by ID
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
    getProduct(id); // Fetch product on component mount
  }, [id]);

  const isInWishlist = wishlist?.some((item) => item.id === product.id);

  return (
    <>
      <h2 className="text-3xl font-bold text-center my-8">Product Details</h2>

      {loading ? <Loading /> : (
        <div className="flex flex-wrap p-8 gap-y-4 items-center">
          <div className="w-1/4 relative">
            <Slider {...settings}>
              {product.images?.map((image, index) => (
                <img key={index} src={image} alt={product.title} className="w-full" />
              ))}
            </Slider>

            {/* Wishlist button */}
            <div
              onClick={() => isInWishlist ? removeProductFromWishlist(product.id) : addProductToWishlist(product.id)}
              className={`absolute top-4 right-4 p-2 ${isInWishlist ? 'text-red-500' : 'text-gray-600'} hover:text-red-600 cursor-pointer`}
            >
              <i className={`fas ${isInWishlist ? 'fa-heart' : 'fa-heart'}`}></i>
            </div>
          </div>

          <div className="w-3/4 ps-6">
            <h2 className="text-2xl">{product.title}</h2>
            <p className="text-gray-600 m-2">{product.description}</p>
            <h3 className="text-gray-900 m-2">{product.category?.name}</h3>
            <div className="flex justify-between">
              <span>{product.price} EGP</span>
              <span className="flex items-center">
                <i className="fas fa-star rating-color mr-1"></i>
                {product.ratingsAverage}
              </span>
            </div>

            {/* Add to Cart button */}
            <button
              onClick={() => addProductToCart(product.id)}
              className="w-full bg-main text-white py-2 rounded-lg mt-4"
            >
              <i className="fas fa-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}
