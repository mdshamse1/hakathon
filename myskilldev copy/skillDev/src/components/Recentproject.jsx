// import { Typography } from "@material-tailwind/react";
import lightcode from '../assets/aiImage.png';

const Recentproject = () => {
    return (
        <div className="dark:bg-black bg-slate-100 dark:text-white duration-300 sm:min-h-[600px] sm:grid sm:place-items-center">
        <div className="container">
       <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
           <div data-aos="slide-right" data-aos-duration="1500" data-aos-once="false">
               <img className="sm:scale-105 sm:translate-x-11 max-h-[300px]" src={lightcode} alt="" />
           </div>
           <div>
               <div className="space-y-5 sm:p-16 pb-6">
                   <h1 data-aos="fade-up" className="text-3xl sm:text-4xl font-bold font-serif">Why AI?</h1>
                   <p data-aos="fade-up">Artificial Intelligence (AI) can greatly enhance student skills by providing personalized learning experiences tailored to individual needs. Through intelligent tutoring systems, AI can identify areas where students struggle and offer targeted practice or explanations, helping them master difficult concepts more effectively.</p>
                   <p data-aos="fade-up">AI-driven tools also foster creativity and critical thinking by offering instant feedback, automating routine tasks, and creating interactive learning environments that keep students engaged. This allows students to focus more on higher-level skills like problem-solving and innovation, preparing them for future challenges.</p>
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
    </div>
    
    </div>
    )

}
export default Recentproject;