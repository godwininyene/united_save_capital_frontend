import { Outlet } from "react-router-dom";
import styles from "../style";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AOS from "aos";
import 'aos/dist/aos.css';
import { useEffect } from "react";
const BaseLayout = ()=>{

    useEffect(()=>{
        AOS.init()
        buildTawkChatWidget()
    },[])

     
    
    
    const buildTawkChatWidget = async()=>{
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/681e086f08bed819150daffb/1iqql1tpo';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
    
    }
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