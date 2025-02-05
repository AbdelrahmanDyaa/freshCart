import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Loading from '../Loading/Loading'; 

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        setCategories(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching categories', error);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return <Loading />; 
  }

  return (
    <div className="container my-5">
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center mt-8 mb-6">All Categories</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link to={`/categories/${category.id}`} key={category.id} className="category-card bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out">
            <img src={category.image} alt={category.name} className="w-full h-40 object-cover rounded-lg" />
            <h3 className="text-lg font-semibold mt-4">{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
