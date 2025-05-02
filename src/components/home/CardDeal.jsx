import { card, thumb, trusted_card } from "../../assets";
import styles, { layout } from "../../style";
import Button from "../common/Button";

const CardDeal = () => (
  <section className={layout.section}>
    <div
      className={layout.sectionInfo}
      data-aos="fade-right"
      data-aos-duration="800"
    >
      <h2 className={styles.heading2}>
        Send money worldwide instantly and securely.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Enjoy fast, secure, and hassle-free international money transfers.
        Whether sending funds to family, paying for services, or managing
        global transactions, our platform ensures seamless and reliable transfers in real-time.
      </p>

      <Button styles={`mt-10`} />
    </div>

    <div
      className={`${layout.sectionImg} relative`}
      data-aos="fade-left"
      data-aos-duration="800"
    >
      <div className="trusted__thumb relative before:absolute before:rounded-full before:bottom-0 before:w-[320px] before:h-[320px] lg:before:w-[450px] lg:before:h-[450px] before:left-[-10px] lg:before:left-[35px]">
        <img
          src={thumb}
          alt="billing"
          className="w-full relative object-cover lg:ml-[15px]"
        />
      </div>
      <div
        className="trusted__card z-[60]"
        data-aos="zoom-in"
        data-aos-duration="800"
        data-aos-delay="200"
      >
        <img src={trusted_card} alt="billing" className="relative z-[50]" />
      </div>
    </div>
  </section>
);

export default CardDeal;
