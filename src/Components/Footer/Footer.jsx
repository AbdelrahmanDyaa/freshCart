export default function Footer() {
  return (
    <footer className="bg-green-600 text-white py-6 px-4 text-sm">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">

        {/* Branding */}
        <div>
          <h2 className="text-xl font-bold">FreshCart</h2>
          <p className="text-gray-200 mt-1">
            Get the latest updates and special offers.
          </p>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h3 className="font-semibold mb-2">Subscribe</h3>
          <form className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-3 py-2 rounded-md border border-white bg-white text-gray-800 text-xs focus:ring-2 focus:ring-green-300 outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-white text-green-600 hover:bg-gray-200 rounded-md font-medium transition text-xs"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-3">
            <a className="text-gray-200 hover:text-white transition"><i className="fa-brands fa-facebook text-lg"></i></a>
            <a className="text-gray-200 hover:text-white transition"><i className="fa-brands fa-twitter text-lg"></i></a>
            <a className="text-gray-200 hover:text-white transition"><i className="fa-brands fa-instagram text-lg"></i></a>
            <a className="text-gray-200 hover:text-white transition"><i className="fa-brands fa-linkedin text-lg"></i></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-300 text-xs mt-4 border-t border-gray-500 pt-3">
        © {new Date().getFullYear()} FreshCart. All rights reserved.
      </div>
    </footer>
  );
}
