import React from "react";
import { steps } from "../../constants";
import styles, { layout } from "../../style";

const circleColors = ["bg-[#089EFF]", "bg-[#FB5141]", "bg-[#674AD9]"];

const StepCard = ({ title, description, index, isLast }) => (
  <div
    className="relative flex items-start space-x-6"
    data-aos="fade-up"
    data-aos-delay={`${index * 200}`}
    data-aos-duration="800"
  >
    {/* Step Number in a Circle */}
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center w-[60px] h-[60px] animate-pulse text-white font-semibold bg-white/10 rounded-full z-10">
        <span className={`w-[45px] h-[45px] rounded-full inline-flex items-center justify-center text-xl font-semibold ${circleColors[index]}`}>
          0{index + 1}
        </span>
      </div>

      {/* Dotted Line for Steps */}
      {!isLast && (
        <div className="w-[2px] h-14 border-l-2 border-dotted border-gray-500"></div>
      )}
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

const Steps = () => {
  return (
    <section id="steps" className={`${layout.section} relative lg:gap-x-7`}>
      {/* Gradient Backgrounds */}
      <div className="absolute z-[3] -right-1/2 top-0 w-[50%] h-[100%] rounded-full white__gradient" />
      <div className="absolute z-[0] w-[50%] h-[100%] -right-1/2 bottom-0 rounded-full pink__gradient" />

      {/* Left Section - Title & Description */}
      <div 
        className="w-full lg:w-2/4"
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        <h2 className={styles.heading2}>
          Simple Steps to Get <br className="sm:block hidden" /> a Personal Loan.
        </h2>
        <p className={`${styles.paragraph} max-w-[470px]`}>
          Our loan application process is designed to be quick, simple, and hassle-free. 
          Follow these easy steps to apply for a personal loan, get approved, and receive 
          funds directly into your account. Whether you need financial support for 
          emergencies, business, or personal expenses, we make borrowing convenient and accessible for you.
        </p>
      </div>

      {/* Right Section - Steps */}
      <div className="w-full lg:w-2/4 mt-7 lg:mt-0">
        {steps.map((step, index) => (
          <StepCard
            key={step.id}
            {...step}
            index={index}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default Steps;
