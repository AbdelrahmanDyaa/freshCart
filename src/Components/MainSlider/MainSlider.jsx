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
  
  return <>
    
    <div className="flex">
      <div className="w-3/4">
      <Slider {...settings}>
      <img src={Slide1} alt="Slide1" className="w-full h-[400px] object-cover" />
      <img src={Slide2} alt="Slide2" className="w-full h-[400px] object-cover" />
      <img src={Slide3} alt="Slide3" className="w-full h-[400px] object-cover" />
            </Slider>


      </div>
      <div className="w-1/4">
      <img src={banner1} alt="banner1" className="w-full h-[200px]" />
      <img src={banner2} alt="banner2" className="w-full h-[200px]" />
    </div>
    </div>
  
  </>
}
