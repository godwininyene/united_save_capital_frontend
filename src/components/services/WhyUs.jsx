import React from "react";
import { why } from "../../constants";
import styles, { layout } from "../../style";
import { payday_thumb } from "../../assets";

const circleColors = [
  "bg-[#089EFF]",
  "bg-[#FB5141]",
  "bg-[#674AD9]",
  "bg-[#E540A3]",
];

const WhyCard = ({ icon, title, description, index }) => (
  <div
    className="relative flex items-start space-x-6 mb-5"
    data-aos="fade-right"
    data-aos-delay={`${index * 200}`} // Staggered effect
    data-aos-duration="800"
  >
    {/* Step Number in a Circle */}
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center w-[60px] h-[60px] text-white font-semibold bg-white/10 rounded-full z-10">
        <span
          className={`w-[45px] h-[45px] rounded-full inline-flex items-center justify-center text-xl font-semibold ${circleColors[index]}`}
        >
          <img
            src={icon}
            alt="star"
            className="w-[50%] h-[50%] object-contain inline-block"
          />
        </span>
      </div>
    </div>

    {/* Step Content */}
    <div className="flex-1">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {description}
      </p>
    </div>
  </div>
);

const WhyUs = () => {
  return (
    <section id="features" className={`${layout.section} gap-x-20`}>
      {/* Features List */}
      <div className={`${layout.sectionImg} flex-col`}>
        {why.map((item, index) => (
          <WhyCard key={item.id} {...item} index={index} />
        ))}
      </div>

      {/* Image Section */}
      <div
        className={layout.sectionInfo}
        data-aos="fade-left"
        data-aos-duration="1000"
      >
        <h2 className={styles.heading2}>Trusted Online Banking.</h2>

        <div className="trusted__thumb mt-7 relative before:absolute before:rounded-full before:bottom-0 before:w-[320px] before:h-[320px] lg:before:w-[450px] lg:before:h-[450px] before:left-[-10px] lg:before:left-[35px]">
          <img
            src={payday_thumb}
            alt="Trusted Banking"
            className="h-[450px] -top-5 relative object-cover lg:ml-[110px]"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
