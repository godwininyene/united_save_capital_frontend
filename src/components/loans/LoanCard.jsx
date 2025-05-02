import styles from "../../style";
const LoanCard = ({ title, icon, description, index }) => (
  <div
    className="flex items-center flex-col px-5 py-7 rounded-[20px] max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5 feature-card-default"
    data-aos="fade-up"
    data-aos-delay={`${index * 200}`}
    data-aos-duration="700"
  >
    <div className={`w-[70px] h-[70px] rounded-full xs:text-[35px] text-[30.89px] ${styles.flexCenter} bg-dimBlue`}>
      <img src={icon} alt="star" className="h-[60%]" />
    </div>
    <h4 className="font-poppins font-semibold text-[18px] text-gradient-2 leading-[23.4px] my-3">
      {title}
    </h4>
    <p className="font-poppins font-normal text-[18px] leading-[30px] text-white text-center">
      {description}
    </p>
  </div>
);

export default LoanCard;
