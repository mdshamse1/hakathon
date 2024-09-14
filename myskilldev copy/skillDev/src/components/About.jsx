import { Typography } from "@material-tailwind/react";
import lightcode2 from '../assets/aiImage2.jpg';
function About() {
  return (
    <div className="dark:bg-black bg-slate-100 dark:text-white duration-300 sm:min-h-[600px] sm:grid sm:place-items-center">
    <div className="container">
   <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
   <div>
           <div className="space-y-5 sm:p-16 pb-6">
               <h1 data-aos="fade-up" className="text-3xl sm:text-4xl font-bold font-serif">AI Integration</h1>
               <p data-aos="fade-up">OnDemand AI enables seamless integration of intelligent agents to optimize workflows and improve decision-making across various industries. By integrating agents from OnDemand AI, you can automate complex tasks, enhance operational efficiency, and drive innovation through advanced machine learning and AI capabilities.</p>
               <p data-aos="fade-up">These agents are designed to adapt to real-world challenges, offering tailored solutions that can be quickly deployed to meet specific business needs. This integration empowers companies to stay competitive by leveraging cutting-edge technology to solve problems in real time and scale their operations effectively.</p>
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
       <div data-aos="slide-right" data-aos-duration="1500" data-aos-once="false">
           <img className="sm:scale-105 sm:translate-x-11 max-h-[300px] min-w-[400px] rounded"  src={lightcode2} alt="" />
       </div>
       
   </div>
</div>

</div>
  )
}

export default About
