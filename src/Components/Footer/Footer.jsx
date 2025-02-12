export default function Footer() {
  return (
    <footer className="bg-green-600 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Branding & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-3">FreshCart</h2>
          <p className="text-gray-200">
            Get the latest updates and special offers. Stay connected with FreshCart.
          </p>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Subscribe to Our Newsletter</h3>
          <form className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md border border-white bg-white text-gray-800 focus:ring-2 focus:ring-green-300 outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-green-600 hover:bg-gray-200 rounded-md font-medium transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Quick Links & Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a className="text-gray-200 hover:text-white transition"><i className="fa-brands fa-facebook text-xl"></i></a>
            <a className="text-gray-200 hover:text-white transition"><i className="fa-brands fa-twitter text-xl"></i></a>
            <a className="text-gray-200 hover:text-white transition"><i className="fa-brands fa-instagram text-xl"></i></a>
            <a className="text-gray-200 hover:text-white transition"><i className="fa-brands fa-linkedin text-xl"></i></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-300 text-sm mt-6 border-t border-gray-500 pt-4">
        © {new Date().getFullYear()} FreshCart. All rights reserved.
      </div>
    </footer>
  );
}
