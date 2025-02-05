export default function Footer() {
  return (
    <footer className="bg-[#E5E7EB] text-gray-900 py-8 px-4 mt-auto">
      <div className="max-w-6xl mx-auto">
        {/* Footer Title and Subtext */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Get The FreshCart Application</h2>
          <p className="text-gray-600 text-lg">
            Subscribe to our newsletter for updates and special offers.
          </p>
        </div>

        {/* Email Form */}
        <form className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-6 py-4 rounded-md border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-lg font-medium rounded-md transition"
          >
            Send Email
          </button>
        </form>
      </div>
    </footer>
  );
}
