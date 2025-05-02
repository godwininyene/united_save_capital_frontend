import { Outlet } from "react-router-dom";
import styles from "../style";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import AOS from "aos";
import 'aos/dist/aos.css';
import { useEffect } from "react";
const BaseLayout = ()=>{

    useEffect(()=>{
        AOS.init()
    },[])
    return(
        <div className="bg-primary w-full overflow-hidden">
            <div className={`${styles.boxWidth} relative z-[9999]`}>
                <Navbar />
            </div>
            
            <main >
                <Outlet />
            </main>
            <div className={`${styles.boxWidth}`}>
                <Footer />
            </div>
        </div>
    )
}

export default BaseLayout;