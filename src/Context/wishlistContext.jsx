import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  
  async function getWishlistProducts() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      console.log("Wishlist fetched:", data?.data); 
      setWishlist(data?.data || []); 
    } catch (err) {
      console.error("Error fetching wishlist products:", err);
      toast.error("Error fetching wishlist products");
    }
  }


  async function addProductToWishlist(productId) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      console.log("Product added to wishlist:", data); 
      toast.success("Product added to wishlist successfully");

    
      getWishlistProducts();
    } catch (err) {
      console.error("Error adding product to wishlist:", err);
      toast.error("Error adding product to wishlist");
    }
  }


  async function removeProductFromWishlist(productId) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      console.log("Product removed from wishlist:", data); 
      toast.success("Product removed from wishlist successfully");

  
      getWishlistProducts();
    } catch (err) {
      console.error("Error removing product from wishlist:", err);
      toast.error("Error removing product from wishlist");
    }
  }

  
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getWishlistProducts(); 
    }
  }, [localStorage.getItem("userToken")]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addProductToWishlist,
        removeProductFromWishlist,
        getWishlistProducts,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
