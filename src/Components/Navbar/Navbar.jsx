import { useState } from 'react';
import logo from '../../assets/images/freshcart-logo.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
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
    // Show a confirmation dialog
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem('userToken');
      setUserToken(null);
      navigate('/login');
    }
  }

  return (
    <>
      <header className="bg-gray-200 fixed inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between px-6 py-3 lg:px-8" aria-label="Global">
          {/* Logo */}
          <Link to={'home'} className="lg:pe-4">
            <span className="sr-only">Your Company</span>
            <img src={logo} width={120} alt="FreshCart Logo" />
          </Link>

          {/* Mobile Menu Button */}
          <div onClick={() => setIsOpen(true)} className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 bg-transparent hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          {userToken && (
            <div className="hidden lg:flex lg:gap-x-4 capitalize">
              <NavLink to={'home'} className="font-medium text-gray-900">
                Home
              </NavLink>
              <NavLink to={'brands'} className="font-medium text-gray-900">
                Brands
              </NavLink>
              <NavLink to={'categories'} className="font-medium text-gray-900">
                Categories
              </NavLink>
              <NavLink to={'products'} className="font-medium text-gray-900">
                Products
              </NavLink>
            </div>
          )}

          {/* Right Section */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-6 items-center">
            {userToken ? (
              <div className="flex items-center gap-6">
                {/* Cart Icon */}
                <NavLink
                  to={'cart'}
                  className="relative text-gray-900 flex items-center font-medium"
                >
                  <i className="fas fa-cart-shopping fa-2xl"></i>
                  {cart && cart.numOfCartItems > 0 && (
                    <span className="text-white bg-red-500 rounded-full absolute -top-2 -right-2 text-xs w-5 h-5 flex items-center justify-center">
                      {cart.numOfCartItems}
                    </span>
                  )}
                </NavLink>

                {/* Wishlist Icon */}
                <NavLink
                  to={'wishlist'}
                  className="relative text-gray-900 flex items-center font-medium"
                >
                  <i className="fas fa-heart fa-2xl"></i>
                  {wishlist && wishlist.numOfWishlistItems > 0 && (
                    <span className="text-white bg-red-500 rounded-full absolute -top-2 -right-2 text-xs w-5 h-5 flex items-center justify-center">
                      
                    </span>
                  )}
                </NavLink>

                {/* User Profile Icon */}
                <NavLink
                  to={'profile'}
                  className="relative text-gray-900 flex items-center font-medium"
                >
                  <i className="fas fa-user-circle fa-2xl"></i>
                </NavLink>

                {/* Logout Button */}
                <button
                  onClick={logOut}
                  className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-red-600 transition duration-200"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <>
                <NavLink to={'/'} className="font-medium text-gray-900">
                  Register
                </NavLink>
                <NavLink to={'login'} className="font-medium text-gray-900">
                  Login
                </NavLink>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={isOpen ? 'lg:hidden' : 'hidden'} role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <NavLink to={'home'} className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img src={logo} width={120} alt="FreshCart Logo" />
              </NavLink>
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="-m-2.5 bg-transparent hover:bg-gray-100 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <NavLink to={'home'} className="block rounded-lg text-base/7 font-medium text-gray-900 hover:bg-gray-50">
                    Home
                  </NavLink>
                  <NavLink to={'cart'} className="block rounded-lg text-base/7 font-medium text-gray-900 hover:bg-gray-50">
                    Cart
                  </NavLink>
                  <NavLink to={'wishlist'} className="block rounded-lg text-base/7 font-medium text-gray-900 hover:bg-gray-50">
                    Wishlist
                  </NavLink>
                  <NavLink to={'brands'} className="block rounded-lg text-base/7 font-medium text-gray-900 hover:bg-gray-50">
                    Brands
                  </NavLink>
                  <NavLink to={'categories'} className="block rounded-lg text-base/7 font-medium text-gray-900 hover:bg-gray-50">
                    Categories
                  </NavLink>
                  <NavLink to={'products'} className="block rounded-lg text-base/7 font-medium text-gray-900 hover:bg-gray-50">
                    Products
                  </NavLink>
                  <NavLink to={'profile'} className="block rounded-lg text-base/7 font-medium text-gray-900 hover:bg-gray-50">
                    Profile
                  </NavLink>
                </div>
                <div className="py-6">
                  <NavLink to={'/'} className="block rounded-lg text-base/7 font-medium text-gray-900 hover:bg-gray-50">
                    Register
                  </NavLink>
                  <NavLink to={'login'} className="block rounded-lg text-base/7 font-medium text-gray-900 hover:bg-gray-50">
                    Log in
                  </NavLink>
                  <button
                    onClick={logOut}
                    className="block rounded-lg text-base/7 font-medium text-gray-900 hover:bg-gray-50"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
