import React from 'react'
import styles from './../../style';
import { discount } from './../../assets';
import Button from '../common/Button';

const Banner = () => {
  return (
    <div id='home' className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      {/* Text Area Start */}
      <div 
        className='w-full lg:w-[70%]'
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        <div 
          className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="300"
        >
          <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
          <p className={`${styles.paragraph} ml-2 uppercase`}>Explore Our Services</p>
        </div>

        <div 
          className="w-full"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="500"
        >
          <h1 className="flex-1 font-poppins font-semibold ss:text-[60px] text-[52px] text-white ss:leading-[70px] leading-[60px]">
            Our Services: <br className="sm:block hidden" />
            <span className="text-gradient-2">Your Trusted <br className="sm:block hidden" /> Financial Partner</span>
          </h1>
          <div className="mt-3">
            <Button />
          </div>
        </div>
      </div>
      {/* Text Area End */}

      {/* Image Area Start */}
      <div 
        className='w-[30%] relative'
        data-aos="zoom-in"
        data-aos-duration="1000"
        data-aos-delay="700"
      >
        <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" />
      </div>
      {/* Image Area End */} 
    </div>
  )
}

export default Banner
