import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading'; 

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        setCategories(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching categories', error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-center text-red-500">An error occurred while loading categories.</p>;

  return (
    <div className="container mx-auto py-10">
     
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">All Categories</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {categories.map((category) => (
          <Link 
            to={`/categories/${category.id}`} 
            key={category.id} 
            className="flex flex-col items-center bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-1"
          >
            <img 
              src={category.image} 
              alt={category.name} 
              className="w-32 h-32 object-cover rounded-full border-4 border-gray-200"
            />
            <h3 className="text-lg font-semibold mt-4 text-gray-700">{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
