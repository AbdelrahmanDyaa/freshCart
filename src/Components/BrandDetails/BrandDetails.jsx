import  { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading'; // Assuming you have a loading spinner

export default function BrandDetails() {
  const { id } = useParams(); // Get the brand ID from the URL
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

  if (loading) {
    return <Loading />;
  }

  if (!brand) {
    return <div>Brand not found</div>;
  }

  return (
    <div className="container my-5">
      <h2 className="text-3xl font-bold text-center mb-6">{brand.name}</h2>
      <img src={brand.image} alt={brand.name} className=" h-64 object-cover rounded-lg" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded shadow">
            <img src={product.imageCover} alt={product.title} className="w-full h-32 object-cover" />
            <h3 className="text-xl font-semibold mt-2">{product.title}</h3>
            <p className="text-gray-500 mt-1">{product.price} EGP</p>
            <Link to={`/productdetails/${product._id}`}>
              <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
