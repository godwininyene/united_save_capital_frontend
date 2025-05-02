import styles from "../../style";
const ServiceCard = ({ title, icon, description }) => {
    const Icon = icon;
   return(
    <div className={``} >
        <Icon className="text-4xl text-blue-500 mb-3" /> 
        <p className="font-poppins font-normal xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] text-gradient-2 uppercase">
        {title}
        </p>
        <p className={`${styles.paragraph} mt-3 `}> {description}</p>
    </div>
   )
   };


export default ServiceCard;
