import styles from "../../style";
import Button from "../common/Button";

const CTA = () => (
  <section 
    className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}
    data-aos="fade-up" 
    data-aos-duration="800"
  >
    <div 
      className="flex-1 flex flex-col"
      data-aos="fade-right" 
      data-aos-delay="200" 
      data-aos-duration="800"
    >
      <h2 className={styles.heading2}>We are a forward-thinking digital bank.</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        United Capital Bank revolutionized the credit card industry
        with data and technology over a decade ago.
        Today, we are among the leading digital banking providers,
        committed to innovation, simplicity, and a more personalized banking experience.
      </p>
    </div>

    <div 
      className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}
      data-aos="fade-left" 
      data-aos-delay="400" 
      data-aos-duration="800"
    >
      <Button />
    </div>
  </section>
);

export default CTA;
