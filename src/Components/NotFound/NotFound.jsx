
import NotFoundSVG from '../../assets/images/error.svg'; // Correct path to your SVG file

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen flex-col bg-white">
      {/* SVG Image */}
      <img
        src={NotFoundSVG} // Use the imported SVG file
        alt="Page Not Found"
        className="w-1/2 max-w-md mb-6"
      />

      {/* Text */}
      <h2 className="text-2xl font-bold text-gray-800">Page Not Found</h2>
      <p className="text-gray-600 mt-2 text-center">
        Oops! The page you're looking for doesn't exist.
      </p>
    </div>
  );
}

