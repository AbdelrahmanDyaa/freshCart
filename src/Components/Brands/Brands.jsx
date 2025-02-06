
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";

const fetchBrands = async () => {
  const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  return response.data.data;
};

export default function Brands() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl mt-10">Error loading brands</div>;
  }

  return (
    <div className="container mx-auto py-10 px-6">
      
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">All Brands</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.map((brand) => (
          <Link 
            to={`/brands/${brand._id}`} 
            key={brand._id} 
            className="group block p-6 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <div className="flex flex-col items-center">
              <img 
                src={brand.image} 
                alt={brand.name} 
                className="w-24 h-24 object-contain rounded-full border-2 border-gray-300 shadow-sm"
              />
              <h3 className="text-lg font-semibold text-gray-700 mt-4 group-hover:text-blue-600">{brand.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
