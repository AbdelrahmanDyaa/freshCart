import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="container flex-grow mt-4 py-12">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
