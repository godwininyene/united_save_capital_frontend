import Banner from "../components/services/Banner";
import ServicesIntro from "../components/services/ServicesIntro";
import ServicesList from "../components/services/ServicesList";
import WhyUs from "../components/services/WhyUs";
import styles from "../style";

const Services = ()=>{
    return(
        <>
            <div className={``}>
                <div className={`${styles.boxWidth}`}>
                    <Banner />
                </div>
            </div>

            <div className={` `}>
                <div className={`${styles.boxWidth}`}>
                    <ServicesIntro />
                    <ServicesList />
                    <WhyUs />
                </div>
            </div>
        </>
    )
};

export default Services;