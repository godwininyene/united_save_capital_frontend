import React from "react";
import { features } from "../../constants";
import styles, { layout } from "../../style";
import Button from "../common/Button";

const FeatureCard = ({ icon, title, content, index }) => (
  <div
    className={`flex flex-row p-6 rounded-[20px] ${
      index !== features.length - 1 ? "mb-6" : "mb-0"
    } ${index == 1 ? "feature-card-default" : ""} feature-card`}
    data-aos="fade-up"
    data-aos-delay={index * 150} 
  >
    <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
      <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
);

const Business = () => {
  return (
    <section id="features" className={layout.section}>
      <div
        className={layout.sectionInfo}
        data-aos="fade-right"
        data-aos-duration="800"
      >
        <h2 className={styles.heading2}>Providing financial access for everyone.</h2>
        <p className={`${styles.paragraph} max-w-[470px]`}>
          Our platform is designed to make banking simple, secure, and accessible to everyone,
          regardless of their financial background. We provide seamless digital banking solutions
          that empower individuals and businesses to save, invest, and transact with ease.
          With innovative features and inclusive financial services, we are committed
          to bridging the gap and ensuring that everyone has the opportunity to achieve
          financial freedom.
        </p>

        <Button styles={`mt-10`} />
      </div>

      <div className={`${layout.sectionImg} flex-col`}>
        {features.map((feature, index) => (
          <FeatureCard key={feature.id} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Business;
