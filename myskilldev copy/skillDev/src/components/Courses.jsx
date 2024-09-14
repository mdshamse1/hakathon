import React from 'react';
import { Link } from 'react-router-dom';  // Import Link
import image1 from '../assets/skill.png';
import image2 from '../assets/pricing.png';
import image3 from '../assets/general.png';
const courses = [
    {
        id: 1,
        title: "Skill check",
        image: image1,
        description: "analyse the cv and give detail about",
        link: "/aiwork",  // Update with the correct route
        aosDelay: 200,
    },
    {
        id: 2,
        title: "Product details",
        image: image2,
        description: "analyze pricing of product and show based on filteration",
        link: "/pricing",
        aosDelay: 400,
    },
    {
        id: 3,
        title: "General task",
        image: image3,
        description: "Ask for general task",
        link: "/generaltask",
        aosDelay: 600,
    },
    // Continue with similar updates for other courses
];

const Courses = () => {
    return (
        <div className="py-14 dark:bg-black dark:text-white sm:min-h-[800px] sm:grid sm:place-items-center">
            <div className="container mx-auto">
                <div className="pb-12">
                    <h1 className="text-3xl font-semibold text-center font-serif sm:text-4xl">
                        Artificial Intelligence
                    </h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                    {
                        courses.map((course) => (
                            <Link to={course.link} key={course.id}>
                                <div 
                                    data-aos="fade-up" 
                                    data-aos-delay={course.aosDelay} 
                                    className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-8 relative dark:bg-black dark:text-white rounded-lg w-[350px] sm:w-[400px] mx-auto transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                                >
                                    <div className="overflow-hidden rounded-lg">
                                        <img 
                                            src={course.image} 
                                            alt={course.title} 
                                            className="w-full h-[200px] object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="relative z-10">
                                        <h2 className="text-xl font-bold">{course.title}</h2>
                                        <p>{course.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Courses;
