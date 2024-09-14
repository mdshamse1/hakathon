import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  // Import React Router
import Navbar from './components/Navbar';
import Aos from 'aos';
import "aos/dist/aos.css";
import './App.css';
import Hero from "./components/Hero";
import About from "./components/About";
import Recentproject from "./components/Recentproject";
import Contact from "./components/Contact";
import Aiwork from "./components/Aiwork";
import Courses from './components/Courses';  // Import Courses component
import Pricing from "./components/Pricing";
import Generaltask from "./components/Generaltask";

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  // AOS Initialization
  useEffect(() => {
    Aos.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    Aos.refresh();
  }, []);

  return (
    <Router>
      <Navbar theme={theme} setTheme={setTheme} />
      
      <Routes>
        <Route path="/" element={<Hero theme={theme} />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/aiwork" element={<Aiwork />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/generaltask" element={<Generaltask />} />

        <Route path="/courses" element={<Courses />} />
        <Route path="/projects" element={<Recentproject />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;