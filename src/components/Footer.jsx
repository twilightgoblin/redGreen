import React from "react";
import { motion } from "framer-motion";
import { Heart, Github, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Quiz", href: "/quiz" },
      { name: "About", href: "#about" },
      { name: "How it Works", href: "/how-it-works" }
    ]
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/twilightgoblin", label: "GitHub" },
    { icon: Mail, href: "mailto:goblintwilight@gmail.com", label: "Email" }
  ];

  return (
    <footer className="relative w-full bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="text-2xl font-bold hover:text-cyan-400 transition-colors duration-300 cursor-pointer">RedGreen</span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-400 text-sm mb-6 max-w-xs"
            >
              Spot the signals, know the vibes, and navigate life with confidence. Your digital companion for better relationships and smarter decisions.
            </motion.p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white font-semibold mb-4 capitalize hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
            >
              Product
            </motion.h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, linkIndex) => (
                <motion.li
                  key={linkIndex}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: linkIndex * 0.05 
                  }}
                >
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white font-semibold mb-4 hover:text-cyan-400 transition-colors duration-300"
            >
              Get in Touch
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3"
            >
              <p className="text-gray-400 text-sm">
                Got ideas to make RedGreen better?
              </p>
              <div className="flex flex-col gap-2">
                <motion.a
                  href="mailto:goblintwilight@gmail.com?subject=RedGreen%20Feedback&body=Hi!%0A%0AI%20have%20some%20feedback%20about%20RedGreen:%0A%0A"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 w-fit"
                >
                  <Mail size={14} />
                  Send Feedback
                </motion.a>
                <motion.a
                  href="https://github.com/twilightgoblin"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 w-fit"
                >
                  <Github size={14} />
                  View on GitHub
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-gray-400 text-sm flex items-center gap-2 hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
            >
              © 2025 RedGreen. All rights reserved.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-sm hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
            >
              Building trust, one vibe at a time.
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;