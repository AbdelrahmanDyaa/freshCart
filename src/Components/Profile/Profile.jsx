import { useContext } from "react";
import { Link } from "react-router-dom";
import UserImg from "../../assets/images/user-profile.png";
import { UserContext } from "../../Context/UserContext";

export default function Profile() {
  const { userName } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex justify-center">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Profile Header */}
        <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 text-white py-10 px-6 text-center">
          <div className="absolute inset-0 bg-blue-600 opacity-20"></div>
          <img
            src={UserImg}
            alt="User Profile"
            className="relative w-32 h-32 rounded-full mx-auto border-4 border-white shadow-md"
          />
          <h1 className="relative mt-4 text-3xl font-bold">{userName}</h1>
          <p className="relative text-lg text-blue-200 mt-2">
            Manage your profile and account settings
          </p>
        </div>

        {/* Profile Content */}
        <div className="p-6 space-y-6">
          {/* Orders Section */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800">All Orders</h2>
            </div>
            <div className="p-6 text-gray-700">
              <p>Manage and track your previous orders here.</p>
              <Link
                to="/allorders"
                className="mt-4 inline-block bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                View Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
