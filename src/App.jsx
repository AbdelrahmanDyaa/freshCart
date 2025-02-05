import './App.css';
import {createHashRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout.jsx';
import Home from './Components/Home/Home.jsx';
import Cart from './Components/Cart/Cart.jsx';
import Categories from './Components/Categories/Categories.jsx';
import Brands from './Components/Brands/Brands.jsx';
import Products from './Components/Products/Products.jsx';
import Login from './Components/Login/Login.jsx';
import Register from './Components/Register/Register.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
import UserContextProvider from './Context/UserContext.jsx';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx';
import CartContextProvider from './Context/CartContext.jsx';
import { Toaster } from 'react-hot-toast';
import WishlistContextProvider from './Context/wishlistContext.jsx';
import Wishlist from './Components/Wishlist/Wishlist.jsx';
import Checkout from './Components/Checkout/Checkout.jsx';
import AllOrders from './Components/AllOrders/AllOrders.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Profile from './Components/Profile/Profile.jsx';
import ForgetPass from './Components/ForgetPass/ForgetPass.jsx';
import ResetCode from './Components/ResetCode/ResetCode.jsx';
import ResetPassword from './Components/ResetPassword/ResetPassword.jsx';
import BrandDetails from './Components/BrandDetails/BrandDetails.jsx'; 
import CategoryDetails from './Components/CategoriesDetails/CategoriesDetails.jsx';

const routers = createHashRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      { index: true, element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
      { path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: 'forgotpassword', element: <ForgetPass /> },
      { path: 'ResetCode', element: <ResetCode /> },
      { path: 'ResetPassword', element: <ResetPassword /> },
      { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: '/brands/:id', element: <ProtectedRoute><BrandDetails /></ProtectedRoute> },
      { path: 'categories/:id' ,element: <ProtectedRoute><CategoryDetails /></ProtectedRoute>,
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

const query = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={query}>
        <WishlistContextProvider>
          <CartContextProvider>
            <UserContextProvider>
              <RouterProvider router={routers} />
              <Toaster />
              <ReactQueryDevtools />
            </UserContextProvider>
          </CartContextProvider>
        </WishlistContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
