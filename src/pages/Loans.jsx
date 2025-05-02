import Banner from "../components/loans/Banner";
import Stats from "../components/loans/Stats";
import CTA from "../components/loans/CTA";
import styles from "../style";
import LoanOptions from "../components/loans/LoanOptions";
import Steps from "../components/loans/Steps";
const Loans = ()=>{
    return(
        <>
            <div className={``}>
                <div className={`${styles.boxWidth}`}>
                    <Banner />
                </div>
            </div>

            <div className={` `}>
                <div className={`${styles.boxWidth}`}>
                    <Stats />
                    <LoanOptions />
                    <Steps />
                    <CTA />
                </div>
            </div>
        </>
    )
};

export default Loans;