import Slide1 from '../../assets/images/slider-image-1.jpeg';
import Slide2 from '../../assets/images/slider-image-2.jpeg';
import Slide3 from '../../assets/images/slider-image-3.jpeg';
import banner1 from '../../assets/images/grocery-banner.png';
import banner2 from '../../assets/images/banner-4.jpeg';
import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 mt-16">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Main Slider Section */}
        <div className="lg:w-3/4 w-full">
          <Slider {...settings}>
            <img
              src={Slide1}
              alt="Slide1"
              className="w-full h-[250px] sm:h-[300px] lg:h-[400px] object-cover rounded-lg shadow-lg"
            />
            <img
              src={Slide2}
              alt="Slide2"
              className="w-full h-[250px] sm:h-[300px] lg:h-[400px] object-cover rounded-lg shadow-lg"
            />
            <img
              src={Slide3}
              alt="Slide3"
              className="w-full h-[250px] sm:h-[300px] lg:h-[400px] object-cover rounded-lg shadow-lg"
            />
          </Slider>
        </div>

        {/* Banners Section */}
        <div className="lg:w-1/4 w-full flex flex-col gap-4">
          <img
            src={banner1}
            alt="banner1"
            className="w-full h-[150px] sm:h-[200px] object-cover rounded-lg shadow-lg"
          />
          <img
            src={banner2}
            alt="banner2"
            className="w-full h-[150px] sm:h-[200px] object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}