import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserImg from '../../assets/images/user-profile.png';
import { UserContext } from '../../Context/UserContext';

export default function Profile() {
  const { userName } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="text-center py-8 px-6 bg-blue-50 border-b border-gray-200">
          <img
            src={UserImg}
            alt="User Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500"
          />
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {userName}</h1>
          <p className="text-gray-600 mt-2">Here’s your profile summary and options to manage your account</p>
        </div>
        <div className="p-6 space-y-8">
          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800">All Orders</h2>
            </div>
            <div className="p-6 text-gray-700">
              <p>Manage and track your previous orders here.</p>
              <Link to="/allorders" className="text-blue-600 hover:underline mt-4 inline-block">Go to Orders</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}