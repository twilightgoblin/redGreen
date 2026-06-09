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
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 10);
      if (currentY < 60) {
        // Always show near the top
        setVisible(true);
      } else if (currentY > lastScrollY.current) {
        // Scrolling down — hide
        setVisible(false);
        setMenuOpen(false);
      } else {
        // Scrolling up — show
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation handler
  const handleNavigation = (item, index) => {
    setActiveIndex(index);
    setMenuOpen(false);

    switch (item.toLowerCase()) {
      case "home":
        if (location.pathname === "/") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          navigate("/");
        }
        break;
      case "features":
        if (location.pathname === "/") {
          const featuresSection = document.getElementById("features");
          if (featuresSection) featuresSection.scrollIntoView({ behavior: "smooth" });
        } else {
          navigate("/features");
        }
        break;
      case "about":
        if (location.pathname === "/") {
          const aboutSection = document.getElementById("about");
          if (aboutSection) aboutSection.scrollIntoView({ behavior: "smooth" });
        } else {
          navigate("/#about");
        }
        break;
      case "working":
      case "how it works":
        navigate("/how-it-works");
        break;
      case "contact":
        if (location.pathname === "/") {
          const contactSection = document.getElementById("contact");
          if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
        } else {
          navigate("/#contact");
        }
        break;
      default:
        break;
    }

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

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  return (
    <nav
      style={{
        transform: visible ? "translateY(0)" : "translateY(-110%)",
        transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      className={`w-full flex flex-col items-center justify-center text-white py-4
        backdrop-blur-md select-none relative transition-all duration-300
        ${scrolled
          ? "bg-white/5 border-b border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
          : "bg-transparent border-b border-transparent"
        }`}
    >
      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-8 lg:gap-10 relative">
        {items.map((item, index) => (
          <li
            key={index}
            onClick={() => handleNavigation(item, index)}
            className="relative cursor-pointer text-base md:text-lg font-medium transition-all duration-300 hover:text-cyan-400 hover:drop-shadow-[0_0_8px_#22d3ee] px-2 py-1"
          >
            <span className="relative inline-block pb-1">{item}</span>
            <span
              ref={(el) => (underlineRefs.current[index] = el)}
              className="absolute left-0 bottom-0 w-full h-[2px] origin-left scale-x-0 bg-cyan-400 transition-transform duration-300"
            />
          </li>
        ))}
      </ul>

      {/* Mobile Navbar */}
      <div className="md:hidden w-full flex justify-between items-center px-6 relative z-50">
        <h1 className="text-xl font-semibold text-cyan-400">RedGreen</h1>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-cyan-400 focus:outline-none text-2xl relative z-50 p-2 rounded-lg hover:bg-cyan-400/10 transition-colors duration-200"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden w-full mt-2 bg-black/80 backdrop-blur-md border-t border-white/10">
          <div className="flex flex-col py-2">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item, index)}
                className={`text-left px-6 py-4 text-base font-medium transition-colors duration-200 border-b border-white/5 last:border-b-0 ${
                  index === activeIndex
                    ? "text-cyan-400 bg-white/5"
                    : "text-white hover:bg-white/5 hover:text-cyan-300"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default SparkleNavbar;
