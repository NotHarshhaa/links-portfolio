"use client";

import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 10);
  });

  return (
    <motion.header
      initial={false}
      animate={{
        padding: scrolled ? "0.75rem 1.5rem" : "1.25rem 2rem",
        backdropFilter: scrolled ? "blur(16px)" : "blur(8px)",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "blur(8px)",
        boxShadow: scrolled
          ? "0 10px 30px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.03)"
          : "0 8px 30px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.02)",
      }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      className={`
        fixed top-6 left-1/2 transform -translate-x-1/2
        w-[92%] max-w-4xl z-50 rounded-full
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
      <Link href="/" className="flex items-center space-x-3 group">
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
            alt="Logo"
            width={42}
            height={42}
            className="relative z-10 group-hover:opacity-90 transition-all duration-300 drop-shadow-lg"
          />
        </motion.div>
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-base font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-zinc-800 via-blue-800/80 to-zinc-600 dark:from-zinc-200 dark:via-blue-400/80 dark:to-zinc-400 hidden sm:inline group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-blue-600 dark:group-hover:from-blue-400 dark:group-hover:via-purple-400 dark:group-hover:to-blue-400 transition-all duration-300"
        >
          H A R S H H A A
        </motion.span>
      </Link>

      {/* Theme Toggle */}
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
    </motion.header>
  );
}
