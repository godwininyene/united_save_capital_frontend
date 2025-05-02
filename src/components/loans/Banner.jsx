import React from 'react'
import styles from './../../style';
import { discount } from './../../assets'
import Button from '../common/Button';

const Banner = () => {
  return (
    <div id='home' 
      className={`flex md:flex-row flex-col ${styles.paddingY}`} 
      data-aos="fade-up" 
      data-aos-duration="800"
    >
      {/* Text Area Start */}
      <div className='w-full lg:w-[70%]'>
        <div 
          className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2"
          data-aos="fade-left"
          data-aos-delay="200"
          data-aos-duration="600"
        >
          <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
          <p className={`${styles.paragraph} ml-2 uppercase`}>Loans & Lines of Credit</p>
        </div>

        <div className="w-full">
          <h1 
            className="flex-1 font-poppins font-semibold ss:text-[60px] text-[52px] text-white ss:leading-[70px] leading-[60px]"
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-duration="700"
          >
            Experience <br /> Our various: <br className="sm:block hidden" />
            <span className="text-gradient-2">Loans Options</span>
          </h1>
          <div className="mt-3" data-aos="fade-up" data-aos-delay="500" data-aos-duration="700">
            <Button />
          </div>
        </div>
      </div>
      {/* Text Area End */}

      {/* Image Area Start */}
      <div className='w-[30%] relative' data-aos="zoom-in" data-aos-duration="800">
        <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" />
      </div>
      {/* Image Area End */} 
    </div>
  )
}

export default Banner
