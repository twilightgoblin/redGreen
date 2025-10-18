"use client";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { HiMenu, HiX } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";

const SparkleNavbar = ({
  items = ["Home", "About", "Services", "Contact"],
  color = "#1E90FF",
  onItemClick,
}) => {
  const underlineRefs = useRef([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // active section
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation handler
  const handleNavigation = (item, index) => {
    setActiveIndex(index);
    setMenuOpen(false);
    
    // Handle navigation based on item name
    switch (item.toLowerCase()) {
      case 'home':
        if (location.pathname === '/') {
          // Scroll to top/hero section if already on home page
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          navigate('/');
        }
        break;
      case 'features':
        if (location.pathname === '/') {
          // Scroll to features section on home page
          const featuresSection = document.getElementById('features');
          if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          navigate('/features');
        }
        break;
      case 'about':
        if (location.pathname === '/') {
          // Scroll to about section on home page
          const aboutSection = document.getElementById('about');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          navigate('/#about');
        }
        break;
      case 'working':
      case 'how it works':
        navigate('/how-it-works');
        break;
      case 'contact':
        if (location.pathname === '/') {
          // Scroll to footer/contact section on home page
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          navigate('/#contact');
        }
        break;
      default:
        break;
    }
    
    // Call the optional onItemClick prop
    onItemClick?.(item);
  };

  // GSAP for the active underline
  useEffect(() => {
    underlineRefs.current.forEach((el, i) => {
      if (el) {
        if (i === activeIndex) {
          gsap.to(el, {
            duration: 1.5,
            scaleX: 1.2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          });
        } else {
          gsap.to(el, { scaleX: 0, duration: 0 });
        }
      }
    });
  }, [activeIndex]);

  return (
    <nav className="w-full flex flex-col items-center justify-center text-white py-6 bg-transparent select-none">
      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-10 relative">
        {items.map((item, index) => (
          <li
            key={index}
            onClick={() => handleNavigation(item, index)}
            className="relative cursor-pointer text-lg font-medium transition-all duration-300 hover:text-cyan-400 hover:drop-shadow-[0_0_8px_#22d3ee]"
          >
            <span className="relative inline-block pb-1">{item}</span>
            {/* underline for active section */}
            <span
              ref={(el) => (underlineRefs.current[index] = el)}
              className="absolute left-0 bottom-0 w-full h-[2px] origin-left scale-x-0 bg-cyan-400 transition-transform duration-300"
            ></span>
          </li>
        ))}
      </ul>

      {/* Mobile Navbar */}
      <div className="md:hidden w-full flex justify-between items-center px-6">
        <h1 className="text-xl font-semibold text-cyan-400">RedGreen</h1>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-cyan-400 focus:outline-none text-3xl relative z-50"
        >
          {menuOpen ? <HiX className="animate-spin-slow" /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden mt-4 flex flex-col items-center gap-6 bg-black/50 backdrop-blur-md py-4 px-6 rounded-2xl border border-cyan-500/30 shadow-lg shadow-cyan-400/10 transform transition-all duration-500 ${
          menuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => handleNavigation(item, index)}
            className={`text-lg font-medium cursor-pointer transition-all duration-300 ${
              index === activeIndex ? "text-cyan-400" : "text-white"
            } hover:text-cyan-400`}
          >
            {item}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default SparkleNavbar;
