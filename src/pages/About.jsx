import AboutSection from "../components/about/AboutSection";
import Banner from "../components/about/Banner";
import CTA from "../components/about/CTA";
import SupportSection from "../components/about/SupportSection";
import styles from "../style";
const About = ()=>{
    return(
        <>
            <div className={``}>
                <div className={`${styles.boxWidth}`}>
                    <Banner />
                </div>
            </div>

            <div className={`${styles.paddingX} ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <AboutSection />
                    <SupportSection />
                    <CTA />
                </div>
            </div>
        </>
    )
};

export default About;