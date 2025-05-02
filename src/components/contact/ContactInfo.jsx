import styles, { layout } from "../../style";
import {IoIosHeadset} from 'react-icons/io';
import {FaEnvelope} from 'react-icons/fa';
import {BsMapFill} from 'react-icons/bs';
import { useState } from "react";
import { SiPolkadot } from 'react-icons/si';

const ContactInfo = () => {

    const[loading, setLoading] = useState(false);
    const[done, setDone] = useState(false)
    const handleSubmit = async e=>{
      e.preventDefault();
      setLoading(true);
      setDone(false)
      setTimeout(()=>{
        setLoading(false)
        setDone(true)
      }, 3000);
    }

  return (
    <section id="" className={`${layout.sectionReverse} gap-x-20`}>
      <div
       className={layout.sectionInfo}
        data-aos="fade-left"
        data-aos-duration="1200"
      >
        <h2 className={styles.heading2} data-aos="fade-up">
            Get In Touch
        </h2>
        <p
          className={`${styles.paragraph} mt-5`}
          data-aos="fade-up"
          data-aos-delay="200"
        >
            Forgot your PIN? Want a loan for your growing business? No matter what you might need,
            we’re always on hand to happily provide answers and assistance.
        </p>
        <div data-aos="fade-up" className='mt-4'>
            <p className='mb-3 flex  flex-col lg:flex-row  lg:items-center'>
                <strong className='inline-flex items-center text-[#FF4E50]'>
                <FaEnvelope className='inline-block mr-1'/>
                Email Us:   
                </strong>
                <span className="block">
                    <a href="mailto:support@cdtexpresscourier.com" className='text-blue-600 inline-block pl-1'>support@unitedcapitalbank.com</a>
                </span>   
            </p>
           
            <p className='mt-3 flex flex-col lg:flex-row  lg:items-center'>
                <strong className='inline-flex items-center text-[#FF4E50]'>
                <IoIosHeadset className='inline-block mr-1'/>
                Call Us:   
                </strong>
                <span className="block">
                    <a href="tel:+1 562 452 3270" className='text-blue-600 inline-block pl-1'>+1 562 452 3270</a>
                </span>   
            </p>


            <p className='mt-3'>
                <strong className='inline-flex items-center text-[#FF4E50]'>
                <BsMapFill className='inline-block mr-1'/>
                CONTACT ADDRESS  
                </strong>
                <span className={`${styles.paragraph} block`}>183 Baya View Quater LA, Los Angeles, United States</span>   
            </p>
        </div>
        {/* gradient start */}
        <div className="absolute z-[3] -left-1/2 top-0 w-[100%] h-[100%] rounded-full white__gradient" />
        <div className="absolute z-[0] w-[100%] h-[100%] -left-1/2 bottom-0 rounded-full pink__gradient" />
        {/* gradient end */}
      </div>

      <div className={layout.sectionInfo}>
        {/* Contact form start here */}
         <div className=''>
            <div data-aos="zoom-in" className='col-md-12 py-4 bg-gray-800'>
                <h2 className='uppercase text-white text-center font-semibold'>Send Us A Message</h2>
            </div>
            <div className='container'>
                <div className='row'>
                    <div data-aos="fade-up" className='py-3'>

                        <form className='' onSubmit={handleSubmit}>
                            <div className="row">
                                <div className='form-group col-md-12 mb-4'>
                                    <input 
                                    type="text" 
                                    name='fullname' 
                                    required 
                                    placeholder='Full name'
                                    className='block w-full py-2 px-3 bg-white font-normal border border-slate-300 rounded-md transition-all duration-100 focus:outline-0 focus:border-[#FF4E50]' 
                                    />

                                </div>
                            </div>


                            <div className="row">
                                <div className='form-group grid mb-4 grid-cols-1 md:grid-cols-2 gap-4'>
                                    <input 
                                    type="email" 
                                    name='email' 
                                    required 
                                    placeholder='Email Address' 
                                    className='block w-full py-2 px-3 bg-white font-normal border border-slate-300 rounded-md transition-all duration-100 focus:outline-0 focus:border-[#FF4E50]' 
                                    />

                                    <input 
                                    type="tel" 
                                    name='phone' 
                                    required 
                                    placeholder='Phone Number' 
                                    className='block w-full py-2 px-3 bg-white font-normal border border-slate-300 rounded-md transition-all duration-100 focus:outline-0 focus:border-[#FF4E50]' 
                                    />
                                </div>
                            </div>  

                            <div className="row">
                                <div className='form-group col-md-12 mb-3'>
                                    <input 
                                    type="text" 
                                    name='subject' 
                                    required 
                                    placeholder='Subject'
                                    className='block w-full py-2 px-3 bg-white font-normal border border-slate-300 rounded-md transition-all duration-100 focus:outline-0 focus:border-[#FF4E50]' 
                                    />

                                </div>
                            </div>

                            <div className="row">
                                <div className='form-group col-md-12 mb-3'>
                                    <textarea 
                                    type="text" 
                                    name='message' 
                                    required 
                                    placeholder='Message'
                                    rows={7}
                                    className='block w-full py-2 px-3 bg-white font-normal border border-slate-300 rounded-md transition-all duration-100 focus:outline-0 focus:border-[#FF4E50]' 
                                    />

                                </div>
                            </div>

                            {
                            done &&(
                                <div className='w-full mb-4'>
                                    <p className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-md">
                                    Thank you for your interest in our courier and logistics services!
                                    Your request for quote has been successfully submitted.
                                    Our team will review your request and get back to you shortly.
                                    </p>
                                </div>
                            )
                            }
                            <div className="row">
                                <div className='form-group col-md-12 mb-3'>
                                    
                                    <button className='inline-block text-white bg-[#FF4E50] leading-[46px]  rounded-md font-semibold px-8 border-2 border-transparent ps-3 pe-3 cursor-pointer transition-all duration-300 ease-in hover:border-gold hover:bg-[#F9D423] hover:text-gold'>
                                    {loading ?  <SiPolkadot className={`animate-spin duration-1000 h-7 w-7`} /> : 'Send Message'}
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>

                </div>

            </div>

        </div>
        {/* Contact form ends here */}
      </div>
    </section>
  );
};

export default ContactInfo;
