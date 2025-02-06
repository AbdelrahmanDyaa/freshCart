import { useNavigate } from "react-router-dom"; // Import useNavigate
import NotFoundSVG from '../../assets/images/error.svg'; // Correct path to your SVG file

export default function NotFound() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGoHome = () => {
    navigate('/home'); // Navigate to the home page
  };

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

      {/* Button */}
      <button
        onClick={handleGoHome}
        className="mt-6 bg-main text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-opacity-80 transition duration-200"
      >
        Go to Home
      </button>
    </div>
  );
}
