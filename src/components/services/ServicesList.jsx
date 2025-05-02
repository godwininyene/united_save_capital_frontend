import { services } from "../../constants";
import styles from "../../style";
import ServiceCard from "./ServiceCard";

const ServicesList = () => (
  <section
    id="clients"
    className={`${styles.paddingY} ${styles.flexCenter} flex-col relative`}
  >
    {/* Background Gradient */}
    <div className="absolute z-[0] w-[60%] h-[60%] -left-[50%] rounded-full blue__gradient bottom-40" />

    {/* Heading & Description */}
    <div
      className="w-full pt-10 lg:pt-0 flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <h2 className={styles.heading2}>
        How We Support You <br className="sm:block hidden" />
      </h2>
      <div className="w-full md:mt-0 mt-6">
        <p className={`${styles.paragraph} text-left max-w-[450px]`}>
          Our professional services for all businesses and worldwide clients.
        </p>
      </div>
    </div>

    {/* Services Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-4 relative gap-x-5">
      {services.map((card, index) => (
        <div
          key={card.id}
          data-aos="zoom-in"
          data-aos-delay={`${index * 200}`} // Staggered effect
          data-aos-duration="700"
        >
          <ServiceCard {...card} />
        </div>
      ))}
    </div>
  </section>
);

export default ServicesList;
