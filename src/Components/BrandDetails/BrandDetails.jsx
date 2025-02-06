import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading'; 

export default function BrandDetails() {
  const { id } = useParams(); 
  const [brand, setBrand] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBrandDetails() {
      try {
        const brandResponse = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
        setBrand(brandResponse.data.data);

        // Fetch products related to the brand
        const productResponse = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`);
        setProducts(productResponse.data.data);
      } catch (error) {
        console.error('Error fetching brand or products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBrandDetails();
  }, [id]);

  if (loading) return <Loading />;
  if (!brand) return <div className="text-center text-red-500 text-xl mt-10">Brand not found</div>;

  return (
    <div className="container mx-auto py-10 px-6">
      <div className="flex flex-col items-center text-center">
        <img 
          src={brand.image} 
          alt={brand.name} 
          className="w-40 h-40 object-cover rounded-full border-4 border-gray-300 shadow-md"
        />
        <h2 className="text-4xl font-bold text-gray-800 mt-4">{brand.name}</h2>
      </div>

      <h3 className="text-2xl font-semibold text-gray-700 text-center mt-8 mb-6">Available Products</h3>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No products found for this brand.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div 
              key={product._id} 
              className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <img 
                src={product.imageCover} 
                alt={product.title} 
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold text-gray-800 mt-3">{product.title}</h3>
              <p className="text-gray-600 mt-1">{product.price} EGP</p>
              <Link to={`/productdetails/${product._id}`} className="block">
                <button className="w-full bg-blue-600 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-700 transition">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
