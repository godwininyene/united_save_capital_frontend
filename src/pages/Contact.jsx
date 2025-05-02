import Banner from "../components/contact/Banner";
import ContactInfo from "../components/contact/ContactInfo";
import Faqs from "../components/contact/Faqs";
import styles from "../style";

const Contact = ()=>{
    return(
        <>
            <div className={``}>
                <div className={`${styles.boxWidth}`}>
                    <Banner />
                </div>
            </div>

            <div className={`${styles.paddingX} ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <ContactInfo />
                    <Faqs />
                    {/* <CTA /> */}
                </div>
            </div>
        </>
    )
};

export default Contact