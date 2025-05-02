import styles from "../style";
import { logo } from "../assets";
import { footerLinks, socialMedia } from "../constants";
import { Link } from "react-router-dom";
import { FaPhoneSquare, FaEnvelope } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
const Footer = () => {

  return (
    <footer className={`${styles.flexCenter} ${styles.paddingY} flex-col`} data-aos="fade-up">
      <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
        <div className="flex-[1] flex flex-col justify-start mr-10" data-aos="fade-right">
          <img
            src={logo}
            alt="hoobank"
            className="w-[266px] h-[72.14px] object-contain"
          />
          <p className={`${styles.paragraph} mt-4 max-w-[312px]`}>
            A new way to make the payments easy, reliable and secure.
          </p>
        </div>

        <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
          {footerLinks.map((footerlink, index) => (
            <div key={footerlink.title} className={`flex flex-col ss:my-0 my-4 min-w-[150px]`} data-aos="fade-up" data-aos-delay={`${index * 100}`}> 
              <h4 className="font-poppins font-medium text-[18px] leading-[27px] text-white">
                {footerlink.title}
              </h4>
              <ul className="list-none mt-4">
                {footerlink.links.map((link, index) => (
                  <li
                    key={link.name}
                    className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer ${
                      index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                    }`}
                  >
                    <Link to={``}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className={`flex flex-col flex-shrink-0 ss:my-0 my-4 w-[250px]`} data-aos="fade-left">
            <h4 className="font-poppins font-medium text-[18px] leading-[27px] text-white">
              Contact Info
            </h4>
            <ul className="list-none mt-4 w-full">
              <li className={`font-poppins flex font-normal items-center gap-x-2 text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer mb-4`}>
                <FaPhoneSquare className="text-secondary text-2xl" />
                <p>
                  <span className="text-white">Call Us: {" "}</span>
                  <a href="tel:+(323) 750-1234">+(323) 750-1234</a>
                </p>
              </li>
              <li className={`font-poppins flex font-normal items-center gap-x-2 text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer mb-4`}>
                <FaLocationPin className="text-secondary text-2xl" />
                <p>
                  <span className="text-white">Address: {" "}</span>
                  <a href="tel:+(323) 750-1234">83 Baya View Quater LA, Los Angeles, United States</a>
                </p>
              </li>
              <li className={`font-poppins flex font-normal items-center gap-x-2 text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer mb-4`}>
                <FaEnvelope className="text-secondary text-2xl" />
                <p>
                  <span className="text-white">Email: {" "}</span>
                  <a href="mailto:support@unitedsavecapital">support@unitedsavecapital</a>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
        <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-slate-300" data-aos="fade-up">
          Copyright Ⓒ {new Date().getFullYear()} United Save Capital. All Rights Reserved.
        </p>
        <div className="flex flex-row md:mt-0 mt-6" data-aos="fade-left">
          {socialMedia.map((social, index) => (
            <img
              key={social.id}
              src={social.icon}
              alt={social.id}
              className={`w-[21px] h-[21px] object-contain cursor-pointer ${
                index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
              }`}
              onClick={() => window.open(social.link)}
            />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
