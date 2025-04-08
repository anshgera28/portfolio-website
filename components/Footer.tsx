"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-indigo-400">Contact</h3>
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-indigo-400 text-xl" />
              <a
                href="mailto:anshgera947@gmail.com"
                className="hover:text-indigo-400 transition-colors duration-300"
              >
                anshgera947@gmail.com
              </a>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-indigo-400">Connect</h3>
            <div className="flex space-x-6">
              <Link
                href="https://www.linkedin.com/in/ansh-gera-bb338425a"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400 transition-colors duration-300"
              >
                <FaLinkedin className="text-2xl" />
              </Link>
              <Link
                href="https://github.com/anshgera28"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400 transition-colors duration-300"
              >
                <FaGithub className="text-2xl" />
              </Link>
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-indigo-400">© 2024</h3>
            <p className="text-sm">
              Built with Next.js, React Three Fiber, and Tailwind CSS
            </p>
          </motion.div>
        </div>

        {/* Bottom Border */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 pt-8 border-t border-gray-800 text-center text-sm"
        >
          <p>Designed and developed with ❤️ by Ansh Gera</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
