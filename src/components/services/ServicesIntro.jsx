import styles, { layout } from "../../style";
import { card } from "../../assets";
import { FaCheckCircle } from "react-icons/fa";

const ServicesIntro = () => {
  return (
    <section id="services" className={`${layout.sectionReverse}`}>
      {/* Image Section */}
      <div 
        className={layout.sectionImgReverse}
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        <img
          src={card}
          alt="billing"
          className="w-[100%] h-[100%] object-cover relative z-[5]"
        />

        {/* gradient start */}
        <div className="absolute z-[3] -left-1/2 top-0 w-[100%] h-[100%] rounded-full white__gradient" />
        <div className="absolute z-[0] w-[100%] h-[100%] -left-1/2 bottom-0 rounded-full pink__gradient" />
        {/* gradient end */}
      </div>

      {/* Text Section */}
      <div 
        className={layout.sectionInfo}
        data-aos="fade-left"
        data-aos-duration="1000"
      >
        <h2 className={styles.heading2}>Instant Banking at Your Fingertips.</h2>
        <p className={`${styles.paragraph} mt-5`}>
          We strive to build on our community bank heritage by combining high ethical
          standards with innovative technologies to deliver truly exceptional service
          to our clients & communities. We are committed to implementing new ideas & cultivating
          relationships that encourage our communities, large & small, to grow & thrive.
        </p>

        {/* Feature List with Staggered Animation */}
        <div className="mt-7">
          <div className="w-full grow">
            <div className="mt-3 md:mt-0 flex w-full lg:gap-x-5">
              {/* Left Column */}
              <div>
                {[
                  "Free Plan Available",
                  "Debit Mastercard Included",
                  "Commitment Free",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex mb-5 items-center"
                    data-aos="fade-up"
                    data-aos-delay={`${200 + index * 150}`}
                    data-aos-duration="500"
                  >
                    <FaCheckCircle className="text-secondary text-2xl" />
                    <h3 className="text-slate-300 text-lg font-semibold ml-2">{item}</h3>
                  </div>
                ))}
              </div>

              {/* Right Column */}
              <div>
                {[
                  "Full Data Privacy Compliance",
                  "100% Transparent Costs",
                  "Real-time Spending Overview",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex mb-5 items-center"
                    data-aos="fade-up"
                    data-aos-delay={`${200 + (index + 3) * 150}`}
                    data-aos-duration="500"
                  >
                    <FaCheckCircle className="text-secondary text-2xl" />
                    <h3 className="text-slate-300 text-lg font-semibold ml-2">{item}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesIntro;
