import { loans } from "../../constants";
import styles from "../../style";
import LoanCard from "./LoanCard";


const LoanOptions = () => (
  <section id="clients" className={`${styles.paddingY} ${styles.flexCenter} flex-col relative`}>
    <div className="absolute z-[0] w-[60%] h-[60%] -left-[50%] rounded-full blue__gradient bottom-40" />

    {/* Heading and Description */}
    <div 
      className="w-full pt-10 lg:pt-0 flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]"
      data-aos="fade-right"
      data-aos-duration="800"
    >
      <h2 className={styles.heading2}>Explore Our Variety <br className="sm:block hidden" /> of Loan Options</h2>
      <div className="w-full md:mt-0 mt-6">
        <p className={`${styles.paragraph} text-left max-w-[450px]`}>
          Enjoy low rates on business or personal loans—auto, personal, or mortgage—United supports your financing needs.
        </p>
      </div>
    </div>

    {/* Loan Cards */}
    <div className="grid grid-cols-1 lg:grid-cols-3 relative z-[1]">
      {loans.map((card, index) => <LoanCard key={card.id} {...card} index={index} />)}
    </div>
  </section>
);

export default LoanOptions;
