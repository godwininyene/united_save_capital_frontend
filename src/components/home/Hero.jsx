import styles from "./../../style";
import { discount, hero_img, banner_shape_1, banner_shape_2 } from "./../../assets";
import GetStarted from "./GetStarted";

const Hero = () => {
  return (
    <div id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      {/* Text Area Start */}
      <div 
        className="flex-1 flex items-start flex-col"
        data-aos="fade-right"
      >
        <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2"
          data-aos="fade-up"
        >
          <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
          <p className={`${styles.paragraph} ml-2`}>
            Explore United Capital Bank Now
          </p>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 
            className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[70px] leading-[60px]"
            data-aos="fade-up"
          >
            The Best <br className="sm:block hidden" />
            <span className="text-gradient-2">International</span>
          </h1>
          <div className="ss:flex hidden md:mr-4 mr-0">
            <GetStarted />
          </div>
        </div>

        <h1 
          className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[70px] leading-[60px] w-full"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Banking System.
        </h1>
        <p 
          className={`${styles.paragraph} max-w-[470px] mt-2`}
          data-aos="fade-up"
          data-aos-delay="400"
        >
          Experience seamless and secure online banking with United Capital Bank. 
          From instant transactions to global accessibility, our cutting-edge platform 
          ensures you stay in control of your finances anytime, anywhere. Open an account, 
          manage your funds, and make payments with ease.
        </p>
      </div>
      {/* Text Area End */}

      {/* Image Area Start */}
      <div 
        className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative w-full lg:w-[50%] lg:pl-12`}
        data-aos="fade-left"
      >
        <img src={hero_img} alt="billing" className="w-full h-full relative z-[5]" />

        <div 
          className="absolute z-[0] w-full lg:w-[90%] h-[100%] top-0 bd-gradient-2 rounded-[6px]"
          data-aos="zoom-in"
          data-aos-delay="300"
        />
        <div 
          className="hidden lg:block absolute z-10 left-8 top-[60%]"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <img src={banner_shape_1} alt="" className="w-[150px]" />
        </div>
        <div 
          className="hidden lg:block absolute z-10 -right-8 top-4"
          data-aos="fade-down"
          data-aos-delay="700"
        >
          <img src={banner_shape_2} alt="" className="w-[150px]" />
        </div>
      </div>
      {/* Image Area End */}

      <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted />
      </div>
    </div>
  );
};

export default Hero;
