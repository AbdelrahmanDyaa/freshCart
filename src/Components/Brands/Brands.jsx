import { Helmet } from "react-helmet";
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
      <div className="text-center bg-dark vw-100 bg-opacity-10 position-absolute start-0 vh-100 d-flex justify-content-center align-items-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>Error loading brands</div>;
  }

  return (
    <div className="container my-5">
      <Helmet>
        <title>Brands</title>
      </Helmet>

      <h2 className="text-3xl font-bold text-center mt-8 mb-6">All Brands</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((brand) => (
          <Link to={`/brands/${brand._id}`} key={brand._id} className="no-underline">
            <div className="bg-white border rounded-lg shadow-md p-4 flex items-center space-x-4 transition-transform transform hover:scale-105 hover:bg-green-100 hover:shadow-lg cursor-pointer">
              <img src={brand.image} alt={brand.name} className="w-16 h-16 object-contain" />
              <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-700">{brand.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
