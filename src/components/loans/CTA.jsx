import styles from "../../style";
import Button from "../common/Button";

const CTA = () => {
  return (
    <section 
      className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      {/* Text Section */}
      <div className="flex-1 flex flex-col">
        <h2 
          className={styles.heading2}
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Building Strength Together!
        </h2>
        <p 
          className={`${styles.paragraph} max-w-[470px] mt-5`}
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="1000"
        >
          Get the financial support you need with our flexible loan options.
          Whether you're planning for a major expense, growing your business,
          or handling unexpected costs, we’re here to help you every step of the way.
          Apply today and take a step toward financial freedom!
        </p>
      </div>

      {/* Button Section */}
      <div 
        className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}
        data-aos="zoom-in"
        data-aos-delay="300"
        data-aos-duration="800"
      >
        <Button />
      </div>
    </section>
  );
};

export default CTA;
