import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard';
import Loading from '../Loading/Loading';
import { Helmet } from 'react-helmet';

const CategoryDetails = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      console.error('Category ID is undefined');
      return;
    }

    const fetchCategoryDetails = async () => {
      try {
        // Fetch the category details
        const categoryResponse = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
        setCategory(categoryResponse.data.data);

        // Fetch products in this category
        const productsResponse = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
        setProducts(productsResponse.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching category details or products', error);
        setIsLoading(false);
      }
    };

    fetchCategoryDetails();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (!category) {
    return <div>No category found.</div>;
  }

  return (
    <div className="container my-5">
      <Helmet>
        <title>{category?.name ? `${category.name} Products` : "Loading..."}</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center mt-8 mb-6">{category?.name} Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryDetails;
