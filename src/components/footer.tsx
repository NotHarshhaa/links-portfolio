"use client";

import { useRef, useCallback, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowUp, Heart, Github, ExternalLink } from "lucide-react";

// Reusable animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

// Reusable button styles
const actionButtonStyles = `
  p-3 rounded-xl
  bg-gradient-to-r from-white/90 via-white/95 to-white/90
  dark:from-zinc-800/90 dark:via-zinc-800/95 dark:to-zinc-800/90
  border border-zinc-200/80 dark:border-zinc-700/80
  hover:border-blue-300/50 dark:hover:border-blue-700/50
  shadow-md hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20
  transition-all duration-300 ease-out
  group flex items-center justify-center
  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 dark:focus:ring-offset-zinc-900
  active:scale-95
`;

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Memoize year calculation
  const year = useMemo(() => new Date().getFullYear(), []);

  // Memoize scroll function
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <motion.footer
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      className="w-full mt-16 sm:mt-24 mb-6 sm:mb-8 px-3 sm:px-4 flex flex-col items-center relative"
    >
      <div
        className="
          bg-gradient-to-r from-white/85 via-white/95 to-white/85
          dark:from-zinc-900/85 dark:via-zinc-900/95 dark:to-zinc-900/85
          backdrop-blur-[16px]
          border-2 border-zinc-100/80 dark:border-zinc-800/80
          text-zinc-800 dark:text-zinc-200
          shadow-[0_10px_30px_rgb(0,0,0,0.07)] dark:shadow-[0_10px_30px_rgb(0,0,0,0.2)]
          hover:shadow-[0_15px_40px_rgb(0,0,0,0.1)] dark:hover:shadow-[0_15px_40px_rgb(0,0,0,0.25)]
          hover:border-blue-300/40 dark:hover:border-blue-700/40
          rounded-2xl w-[95%] max-w-4xl mx-auto px-4 sm:px-8 py-4 sm:py-6
          flex flex-col lg:flex-row items-center lg:justify-between text-sm font-medium
          transition-all duration-500 ease-out
        "
      >
        <motion.div
          variants={itemVariants}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col lg:flex-row items-center lg:space-x-6 text-center lg:text-left space-y-3 lg:space-y-0 mb-4 lg:mb-0"
        >
          <div className="relative size-10 sm:size-12 flex items-center justify-center group">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="absolute inset-0 bg-gradient-to-r from-blue-500/40 to-purple-500/40 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"
            />
            <Image
              src="/assets/avatar.png"
              alt="Harshhaa's Avatar"
              width={40}
              height={40}
              className="relative z-10 rounded-full border-2 border-zinc-200/70 dark:border-zinc-700/70 drop-shadow-md hover:scale-110 transition-transform duration-300"
              priority
            />
          </div>
          
          <div className="flex flex-col space-y-1 sm:space-y-2">
            <p className="text-sm tracking-wide font-medium">
              © {year}
              <span className="mx-2 text-zinc-400 dark:text-zinc-500">•</span>
              <a
                href="https://notharshhaa.site"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 
                  dark:from-blue-400 dark:to-purple-400 
                  hover:from-purple-500 hover:to-blue-600 
                  dark:hover:from-purple-400 dark:hover:to-blue-400 
                  transition-all duration-300 font-bold
                  inline-flex items-center gap-1
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-1 dark:focus:ring-offset-zinc-900 rounded
                "
              >
                H A R S H H A A
                <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
              </a>
            </p>
            
            <div className="flex items-center justify-center lg:justify-start text-zinc-600 dark:text-zinc-400 text-xs">
              <span>Crafted with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mx-1"
              >
                <Heart className="h-3 w-3 text-red-500" />
              </motion.div>
              <span>and</span>
              <span className="mx-1 inline-flex items-center">
                <Github className="h-3 w-3 mr-1 text-zinc-600 dark:text-zinc-400" />
                open source
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center space-x-3"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/NotHarshhaa"
            target="_blank"
            rel="noopener noreferrer"
            className={actionButtonStyles}
            aria-label="Visit Harshhaa's GitHub Profile"
          >
            <Github className="w-5 h-5 text-blue-600/90 dark:text-blue-400/90 group-hover:scale-110 transition-transform duration-300" />
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className={actionButtonStyles}
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-5 h-5 text-blue-600/90 dark:text-blue-400/90 group-hover:scale-110 transition-transform duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </motion.footer>
  );
}
