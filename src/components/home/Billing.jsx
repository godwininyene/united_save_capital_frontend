import React from "react";
import { layout } from "../../style";
import styles from "../../style";
import { apple, google, bill } from "../../assets";
import Button from "../common/Button";

const Billing = () => {
  return (
    <section id="product" className={layout.sectionReverse}>
      <div
        className={layout.sectionImgReverse}
        data-aos="fade-left"
        data-aos-duration="800"
      >
        <img src={bill} alt="billing" className="w-[100%] h-[100%] relative z-[5]" />

        {/* gradient start */}
        <div className="absolute z-[3] -left-1/2 top-0 w-[100%] h-[100%] rounded-full white__gradient" />
        <div className="absolute z-[0] w-[100%] h-[100%] -left-1/2 bottom-0 rounded-full pink__gradient" />
        {/* gradient end */}
      </div>

      <div
        className={layout.sectionInfo}
        data-aos="fade-right"
        data-aos-duration="800"
      >
        <h2 className={styles.heading2}>
          Easily control your <br className="sm:block hidden" /> billing & invoicing
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Effortlessly manage your billing and invoicing with our seamless and intuitive system.
          Stay organized, track transactions, and process payments with ease,
          all in one secure platform.
        </p>

        <div
          className="flex items-center gap-x-2 sm:mt-10 mt-6" 
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="200"
        >
          <Button />
          <img
            src={google}
            alt="google_play"
            className="w-[144.17px] h-[43.08px] object-contain cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
};

export default Billing;
