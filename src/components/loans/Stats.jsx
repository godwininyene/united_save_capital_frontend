import React from 'react'
import { loansStats } from '../../constants'
import styles from '../../style'

const Stats = () => {
  return (
    <div 
      className={`${styles.flexCenter} flex-col lg:flex-row flex-wrap sm:mb-20 mb-6`}
      data-aos="fade-up"
      data-aos-duration="800"
    >
      {loansStats.map((stat, index) => (
        <div 
          key={stat.id} 
          className="flex-1 flex items-center flex-col m-3"
          data-aos="fade-up"
          data-aos-delay={`${index * 200}`} 
          data-aos-duration="700"
        >
          <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-white">
            {stat.icon}
          </h4>
          <p className="font-poppins font-normal xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] text-gradient-2 uppercase ml-3">
            {stat.title}
          </p>
          <p className={`${styles.paragraph} mt-3 text-center`}>
            {stat.description}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Stats
