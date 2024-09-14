import { BiSolidMoon, BiSolidSun, BiMenu, BiX } from "react-icons/bi";
import { Link } from "react-router-dom";  // Import Link for routing
import { useState } from "react";  // Import useState to handle menu toggle

function Navbar({ theme, setTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu visibility

  const NavLinks = [
    { id: '1', name: 'HOME', link: '/' },
    { id: '2', name: 'AI-TOOLS', link: '/courses' },
    // { id: '3', name: 'ABOUT', link: '#' },
    { id: '4', name: 'CONTACT-US', link: '/contact' },
  ];

  return (
    <nav className="shadow-sm bg-white dark:bg-dark dark:text-white duration-300">
      <div className="container">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-serif">Skill-Dev</h1>
          </div>

          {/* Desktop Navbar Links */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {NavLinks.map((data) => (
                <li key={data.id} className="py-4">
                  <Link
                    className="inline-block py-2 hover:border-b-2 hover:text-primary hover:border-primary transition-colors duration-500 text-lg font-medium"
                    to={data.link}
                  >
                    {data.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl">
              {isMenuOpen ? <BiX /> : <BiMenu />}
            </button>
          </div>

          {/* Theme Toggle */}
          <div>
            {theme === "dark" ? (
              <BiSolidSun
                onClick={() => setTheme("light")}
                className="text-2xl cursor-pointer"
              />
            ) : (
              <BiSolidMoon
                onClick={() => setTheme("dark")}
                className="text-2xl cursor-pointer"
              />
            )}
          </div>
        </div>

        {/* Mobile Navbar Links */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col items-center mt-4">
            <ul className="flex flex-col items-center gap-4">
              {NavLinks.map((data) => (
                <li key={data.id} className="py-2">
                  <Link
                    className="block py-2 text-lg font-medium hover:text-primary"
                    to={data.link}
                    onClick={() => setIsMenuOpen(false)} // Close menu after click
                  >
                    {data.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
