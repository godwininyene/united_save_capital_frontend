import styles, { layout } from "../../style";
import Button from "../common/Button";
import { mission } from "../../assets";
import { FaMedal, FaCheckCircle } from "react-icons/fa";

const AboutSection = () => {

  return (
    <section id="about" className={`${layout.sectionReverse} gap-x-20`}>
      <div
        className={layout.sectionImgReverse}
        data-aos="fade-left"
        data-aos-duration="1200"
      >
        <img
          src={mission}
          alt="billing"
          className="w-[100%] h-[100%] object-cover relative z-[5]"
        />
        {/* gradient start */}
        <div className="absolute z-[3] -left-1/2 top-0 w-[100%] h-[100%] rounded-full white__gradient" />
        <div className="absolute z-[0] w-[100%] h-[100%] -left-1/2 bottom-0 rounded-full pink__gradient" />
        {/* gradient end */}
      </div>

      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2} data-aos="fade-up">
          Revolutionizing Digital Banking.
        </h2>
        <p
          className={`${styles.paragraph} mt-5`}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          United Capital Bank® is a federally chartered savings bank based in
          the United States. Recognized as a leader in the industry, it has been
          ranked among the top community banks and mid-sized financial
          institutions nationwide. While gaining recognition across the country,
          our primary focus has always been on delivering exceptional service to
          our customers.
        </p>

        <div className="mt-7" data-aos="fade-up" data-aos-delay="300">
          <div className="md:flex md:gap-x-4">
            <div className="w-4/5 md:w-1/3 lg:w-[40%]" data-aos="fade-up">
              <div className="rounded-md bg-gray-100 p-5 flex flex-col items-center">
                <FaMedal className="text-[55px] lg:text-[60px] text-secondary" />
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-2 flex items-center">
                    <span className="text-[36px] font-semibold">10</span>
                    <span className="text-secondary text-xl font-semibold ml-1">
                      +
                    </span>
                  </div>
                  <h2 className="font-normal text-center">
                    Years Of Experiences
                  </h2>
                </div>
              </div>
              <div className="mt-3">
                <Button styles={"w-full"} />
              </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-[57%] grow">
              <div className="md:ml-7 mt-3 md:mt-0">
                <div
                  className="flex mb-5"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <div className="flex-shrink-0 mr-2">
                    <FaCheckCircle className="text-secondary text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-slate-300 text-lg font-semibold">
                      Skilled
                    </h3>
                    <p className={`${styles.paragraph} mt-5`}>
                      We always create an awe experience and build inspiring
                      relationships.
                    </p>
                  </div>
                </div>

                <div
                  className="flex mb-5"
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  <div className="flex-shrink-0 mr-2">
                    <FaCheckCircle className="text-secondary text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-slate-300 text-lg font-semibold">
                      Experienced
                    </h3>
                    <p className={`${styles.paragraph} mt-5`}>
                      Over 10 years creating the spectacular experience. Over
                      20,000 visitors. Over 2500 Exhibitors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
