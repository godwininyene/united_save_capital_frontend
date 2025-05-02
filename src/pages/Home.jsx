import Testimonials from "../components/home/Testimonials";
import Billing from "../components/home/Billing";
import Business from "../components/home/Business";
import CardDeal from "../components/home/CardDeal";
import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import styles from "../style";
import Clients from "../components/home/Clients";
import CTA from "../components/home/CTA";

const Home = ()=>{
    return(
        <>
            <div className={``}>
                <div className={`${styles.boxWidth}`}>
                    <Hero />
                </div>
            </div>

            <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <Stats />
                    <Business />
                    <Billing />
                    <CardDeal />
                    <Testimonials />
                    <Clients />
                    <CTA />
                </div>
            </div>
        </>
    )
};

export default Home;