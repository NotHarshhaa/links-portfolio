"use client";

import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 10);
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className="h-16" />;
  }

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          padding: scrolled ? "0.5rem 1rem" : "1rem 1.5rem",
          backdropFilter: scrolled ? "blur(16px)" : "blur(8px)",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "blur(8px)",
          boxShadow: scrolled
            ? "0 10px 30px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.03)"
            : "0 8px 30px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.02)",
        }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        className={`
          fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2
          w-[94%] sm:w-[92%] max-w-4xl z-50 rounded-full
          flex items-center justify-between
          bg-gradient-to-r from-white/80 via-white/95 to-white/80
          dark:from-zinc-900/80 dark:via-zinc-900/95 dark:to-zinc-900/80
          border border-zinc-100/80 dark:border-zinc-800/80
          shadow-[0_8px_30px_rgb(0,0,0,0.05)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)]
          hover:shadow-[0_10px_40px_rgb(0,0,0,0.1)] dark:hover:shadow-[0_10px_40px_rgb(0,0,0,0.25)]
          hover:border-blue-300/40 dark:hover:border-blue-700/40
          transition-all duration-500
          glass-morphism
        `}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group" aria-label="Go to homepage">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9, rotate: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 to-purple-500/40 rounded-full blur-xl group-hover:blur-2xl group-hover:scale-125 transition-all duration-500 animate-pulse-subtle" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-md group-hover:blur-xl group-hover:scale-110 transition-all duration-300" />
            <Image
              src="/logo.svg"
              alt="Harshhaa Logo"
              width={36}
              height={36}
              className="relative z-10 group-hover:opacity-90 transition-all duration-300 drop-shadow-lg sm:w-[42px] sm:h-[42px]"
              priority
            />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-sm sm:text-base font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-zinc-800 via-blue-800/80 to-zinc-600 dark:from-zinc-200 dark:via-blue-400/80 dark:to-zinc-400 hidden sm:inline group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-blue-600 dark:group-hover:from-blue-400 dark:group-hover:via-purple-400 dark:group-hover:to-blue-400 transition-all duration-300"
          >
            H A R S H H A A
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-3 lg:space-x-4">
            <a
              href="#personal-network"
              className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Go to personal network section"
            >
              Personal
            </a>
            <a
              href="#community-network"
              className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              aria-label="Go to community network section"
            >
              Community
            </a>
            <a
              href="#resources"
              className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              aria-label="Go to resources section"
            >
              Resources
            </a>
          </nav>
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative group"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/30 to-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-blue-400/10 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ModeToggle />
            </motion.div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-1.5 sm:p-2 rounded-lg bg-white/50 dark:bg-neutral-800/50 border border-neutral-200/50 dark:border-neutral-700/50 hover:bg-white/80 dark:hover:bg-neutral-800/80 transition-colors"
            onClick={toggleMobileMenu}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-600 dark:text-neutral-400" />
            ) : (
              <Menu className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-600 dark:text-neutral-400" />
            )}
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 sm:top-24 left-4 right-4 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:w-[92%] sm:max-w-sm z-40 md:hidden"
          >
            <div className="bg-gradient-to-r from-white/95 via-white/98 to-white/95 dark:from-neutral-900/95 dark:via-neutral-800/98 dark:to-neutral-900/95 backdrop-blur-[16px] border border-neutral-200/60 dark:border-neutral-700/60 rounded-2xl shadow-[0_10px_30px_rgb(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgb(0,0,0,0.3)] p-3 sm:p-4">
              <nav className="flex flex-col space-y-2 sm:space-y-3">
                <a
                  href="#personal-network"
                  className="group relative flex items-center justify-between rounded-xl border border-neutral-200/60 bg-white/80 p-3 text-sm font-medium shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-md hover:scale-[1.02] dark:border-neutral-700/60 dark:bg-neutral-800/80 dark:hover:border-blue-600 backdrop-blur-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-neutral-700 dark:text-neutral-300 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                    Personal Network
                  </span>
                  <div className="w-2 h-2 rounded-full bg-blue-500/60 group-hover:bg-blue-500 transition-colors"></div>
                </a>
                <a
                  href="#community-network"
                  className="group relative flex items-center justify-between rounded-xl border border-neutral-200/60 bg-white/80 p-3 text-sm font-medium shadow-sm transition-all duration-300 hover:border-purple-300 hover:shadow-md hover:scale-[1.02] dark:border-neutral-700/60 dark:bg-neutral-800/80 dark:hover:border-purple-600 backdrop-blur-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-neutral-700 dark:text-neutral-300 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                    Community Network
                  </span>
                  <div className="w-2 h-2 rounded-full bg-purple-500/60 group-hover:bg-purple-500 transition-colors"></div>
                </a>
                <a
                  href="#resources"
                  className="group relative flex items-center justify-between rounded-xl border border-neutral-200/60 bg-white/80 p-3 text-sm font-medium shadow-sm transition-all duration-300 hover:border-green-300 hover:shadow-md hover:scale-[1.02] dark:border-neutral-700/60 dark:bg-neutral-800/80 dark:hover:border-green-600 backdrop-blur-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-neutral-700 dark:text-neutral-300 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                    Resources
                  </span>
                  <div className="w-2 h-2 rounded-full bg-green-500/60 group-hover:bg-green-500 transition-colors"></div>
                </a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
