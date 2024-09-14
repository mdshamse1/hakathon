import darkcode from '../assets/darkcode.png';
import lightcode from '../assets/lightcode.png';
import About from './About';
import Recenetproject from './Recentproject'
function Hero({theme}) {
  return (
    <div className="dark:bg-black dark:text-white duration-300 relative -z-20">
        <div className='container min-h-[600px] flex'>
            <div className="grid place-items-center grid-cols-1 sm:grid-cols-2">
                <div data-aos="zoom-in" data-aos-duration="1500" className="order-1 sm:order-2">
                    <img src={theme === "dark" ? darkcode : lightcode} alt="" className="relative -z-10 max-h-[450px] sm:scale-125 drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)  drop-shadow(-2px -20px 6px rgba(255,255,255,0.50))] rounded-md"/>
                </div>
                <div className="order-2 sm:order-1 space-y-5 sm:pr-32">
                <p data-aos="fade-up" className="text-primary text-2xl font-serif">
                    Enhance
                </p>
                    <h1 data-aos="fade-up" data-aos-delay="600" className="text-5xl lg:text-7xl font-semibold font-serif">Your Knowledge</h1>
                    <p data-aos="fade-up" data-aos-delay="1000">
                    To solve real-world problems and be job-ready for the evolving demands of the future workforce. Focus on developing critical thinking, creativity, and adaptability while mastering both technical and soft skills.
                    </p>
                    <p
  data-aos="fade-up"
  data-aos-delay="1500"
  className="btn text-primary  rounded-md  hover:text-black duration-300 cursor-pointer"
  style={{ cursor: 'pointer' }}
>
  Let's code
</p>
                </div>
            </div>
        </div>
        <Recenetproject />
        <About />
        

    </div>
  )
}

export default Hero
