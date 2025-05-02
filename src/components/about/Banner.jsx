import styles from "./../../style";
import { discount } from "./../../assets";
import Button from "../common/Button";

const Banner = () => {
 
  return (
    <div id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      {/* Text Area Start */}
      <div
        className="w-full lg:w-[70%]"
        data-aos="fade-left"
      >
        <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
          <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
          <p className={`${styles.paragraph} ml-2 uppercase`}>About Us</p>
        </div>

        <div className="w-full">
          <h1
            className="flex-1 font-poppins font-semibold ss:text-[60px] text-[52px] text-white ss:leading-[70px] leading-[60px]"
            data-aos="zoom-in"
          >
            Empowering <br /> Financial Journey: <br className="sm:block hidden" />
            <span className="text-gradient-2">
              Welcome to United <br /> Capital Bank
            </span>
          </h1>
          <div className="mt-3" data-aos="fade-up">
            <Button />
          </div>
        </div>
      </div>
      {/* Text Area End */}

      {/* Image Area Start */}
      <div className="w-[30%] relative" data-aos="fade-right">
        <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" />
      </div>
      {/* Image Area End */}
    </div>
  );
};

export default Banner;
