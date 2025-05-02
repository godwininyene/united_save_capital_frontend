import { feedback } from "../../constants";
import styles from "../../style";
import FeedbackCard from "./FeedbackCard";

const Testimonials = () => {
  return (
    <section id="clients" className={`${styles.paddingY} ${styles.flexCenter} flex-col relative `}>
      <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" />

      <div 
        className="w-full pt-10 lg:pt-0 flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h2 className={styles.heading2}>
          What People are <br className="sm:block hidden" /> saying about us
        </h2>
        <div className="w-full md:mt-0 mt-6">
          <p className={`${styles.paragraph} text-left max-w-[450px]`}>
            Everything you need to accept card payments and grow your business
            anywhere on the planet.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 relative z-[1]">
        {feedback.map((card, index) => (
          <FeedbackCard key={card.id} {...card} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
