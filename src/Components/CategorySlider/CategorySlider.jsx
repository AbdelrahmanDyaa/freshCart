import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";

export default function CategorySlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5, // Default for large screens
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024, // Large screens (lg)
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768, // Tablets (md)
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640, // Small screens (sm)
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Extra small screens (xs)
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [categories, setCategories] = useState([]);

  async function getCategories() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setCategories(data.data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <Slider {...settings}>
        {categories.map((category, index) => (
          <div key={index} className="px-2">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-[200px] object-cover rounded-lg shadow-lg"
            />
            <h2 className="text-center text-lg font-semibold mt-2">
              {category.name}
            </h2>
          </div>
        ))}
      </Slider>
    </div>
  );
}
