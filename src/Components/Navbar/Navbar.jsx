import { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/freshcart-logo.svg';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/wishlistContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let { userToken, setUserToken } = useContext(UserContext);
  let { cart } = useContext(CartContext);
  let { wishlist } = useContext(WishlistContext);
  let navigate = useNavigate();

  function logOut() {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem('userToken');
      setUserToken(null);
      setIsOpen(false); // Close mobile menu if open
      navigate('/login', { replace: true });
    }
  }

  return (
    <header className="bg-white shadow-md fixed inset-x-0 top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo and Navigation Links */}
        <div className="flex items-center gap-6">
          <Link to={'home'} className="lg:pe-4">
            <span className="sr-only">Your Company</span>
            <img src={logo} width={140} alt="FreshCart Logo" className="transition-transform duration-300 hover:scale-105" />
          </Link>
          {userToken && (
            <div className="hidden lg:flex lg:gap-6 capitalize text-gray-700">
              <NavLink to={'home'} className="hover:text-main transition">Home</NavLink>
              <NavLink to={'brands'} className="hover:text-main transition">Brands</NavLink>
              <NavLink to={'categories'} className="hover:text-main transition">Categories</NavLink>
              <NavLink to={'products'} className="hover:text-main transition">Products</NavLink>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex lg:items-center space-x-6">
          {userToken ? (
            <div className="flex items-center gap-6">
              <NavLink to={'cart'} className="relative text-gray-700 flex items-center font-medium">
                <i className="fas fa-cart-shopping text-2xl hover:text-main transition"></i>
                {cart && cart.numOfCartItems > 0 && (
                  <span className="text-white bg-red-500 rounded-full absolute -top-2 -right-2 text-xs w-5 h-5 flex items-center justify-center">
                    {cart.numOfCartItems}
                  </span>
                )}
              </NavLink>

              <NavLink to={'wishlist'} className="relative text-gray-700 flex items-center font-medium">
                <i className="fas fa-heart text-2xl hover:text-red-500 transition"></i>
                {wishlist && wishlist.numOfWishlistItems > 0 && (
                  <span className="text-white bg-red-500 rounded-full absolute -top-2 -right-2 text-xs w-5 h-5 flex items-center justify-center">
                    {wishlist.numOfWishlistItems}
                  </span>
                )}
              </NavLink>

              <NavLink to={'profile'} className="text-gray-700 flex items-center font-medium hover:text-main transition">
                <i className="fas fa-user-circle text-2xl"></i>
              </NavLink>

              <button
                onClick={logOut}
                className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-red-600 transition duration-300"
              >
                Log Out
              </button>
            </div>
          ) : (
            <>
              <NavLink to={'/'} className="font-medium text-gray-700 hover:text-main transition">Register</NavLink>
              <NavLink to={'login'} className="font-medium text-gray-700 hover:text-main transition">Login</NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div onClick={() => setIsOpen(true)} className="lg:hidden">
          <button
            type="button"
            className="p-2.5 text-gray-700 bg-transparent hover:bg-gray-100 rounded-md"
          >
            <span className="sr-only">Open main menu</span>
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 shadow-lg rounded-lg">
          <div className="flex items-center justify-between">
            <NavLink to={'home'} className="-m-1.5 p-1.5">
              <img src={logo} width={140} alt="FreshCart Logo" />
            </NavLink>
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="p-2.5 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <div className="mt-6 space-y-4 text-gray-700">
            <NavLink to={'home'} className="block hover:text-main transition">Home</NavLink>
            <NavLink to={'cart'} className="block hover:text-main transition">Cart</NavLink>
            <NavLink to={'wishlist'} className="block hover:text-main transition">Wishlist</NavLink>
            <NavLink to={'brands'} className="block hover:text-main transition">Brands</NavLink>
            <NavLink to={'categories'} className="block hover:text-main transition">Categories</NavLink>
            <NavLink to={'products'} className="block hover:text-main transition">Products</NavLink>
            <NavLink to={'profile'} className="block hover:text-main transition">Profile</NavLink>
            {userToken ? (
              <button
                onClick={logOut}
                className="block w-full text-left hover:text-red-500 transition"
              >
                Log Out
              </button>
            ) : (
              <>
                <NavLink to={'login'} className="block hover:text-main transition">Login</NavLink>
                <NavLink to={'/'} className="block hover:text-main transition">Register</NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}