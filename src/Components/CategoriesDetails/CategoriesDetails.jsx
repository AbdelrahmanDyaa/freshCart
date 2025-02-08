import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';



export default function CategoryDetails() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);


  useEffect(() => {
    async function fetchCategoryData() {
      try {
        // Fetch category details
        const categoryResponse = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
        setCategory(categoryResponse.data.data);

        // Fetch subcategories of this category
        const subcategoriesResponse = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
        setSubcategories(subcategoriesResponse.data.data);

      } catch (error) {
        console.error('Error fetching category details or subcategories', error);
      }
    };

    fetchCategoryData();
  }, [id]);

  if (!category) {
    return <div className="flex items-center justify-center mt-8">
    <div className="text-center">
      <i className="fa-solid fa-tables fa-4x"></i>
      <h2 className="mt-4">
       No category found.
      </h2>
     
    </div>
  </div>
  }

  return <div className="container mx-auto px-4 py-8">
    {category ? (
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800">{category.name}</h2>
        <img
          src={category.image}
          alt={category.name}
          className="w-56 h-56 object-cover mx-auto rounded-lg mt-4 shadow-md"
        />

        <h3 className="text-2xl font-semibold mt-8 text-gray-700">Subcategories</h3>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {subcategories.map((sub) => (
            <div
              key={sub._id}
              className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition duration-200 ease-in-out"
            >
              <h4 className="text-lg font-medium text-gray-800">{sub.name}</h4>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <p className="text-center text-gray-500">Loading data...</p>
    )}
  </div>


};


