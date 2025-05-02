import React from 'react'
import { support } from '../../constants'
import styles, { layout } from '../../style'
import { connecting_teams } from '../../assets'

const SupportCard = ({ icon, title, content, index }) => (
  <div 
    className={`flex flex-row p-6 rounded-[20px] ${index !== support.length - 1 ? "mb-6" : "mb-0"} ${index==1 ?'feature-card-default' :''} feature-card`}
    data-aos="fade-left" 
    data-aos-delay={index * 200} 
    data-aos-duration="800"
  >
    <div className={`w-[100px] h-[100px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
      <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain inline-block" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
);

const SupportSection = () => {
  return (
    <section id="features" className={`${layout.section} gap-x-20`}>
      
      <div className={layout.sectionInfo} data-aos="fade-up" data-aos-duration="800">
        <h2 className={styles.heading2}>How We Support You.</h2>
        <p className={`${styles.paragraph} max-w-[470px]`}>
          Send money to your friends and family instantly, anytime, anywhere, with no delays.
        </p>

        <img src={connecting_teams} alt="Connecting Teams" 
          data-aos="fade-right" 
          data-aos-delay="200" 
          data-aos-duration="800"
        />
      </div>

      <div className={`${layout.sectionImg} flex-col`}>
        {support.map((support, index) => (
          <SupportCard key={support.id} {...support} index={index} />
        ))}
      </div>

    </section>
  )
}

export default SupportSection
