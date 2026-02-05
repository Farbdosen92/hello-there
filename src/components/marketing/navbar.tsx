"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { motion } from "framer-motion";
import Link from "next/link";

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/5 bg-white/5 dark:bg-black/5 backdrop-blur-xl px-6 flex items-center justify-between"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]">
          N
        </div>
        <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-white">NFCwear</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
        <Link href="#features" className="hover:text-blue-500 transition-colors">Features</Link>
        <Link href="#idea" className="hover:text-blue-500 transition-colors">Unsere Idee</Link>
        <Link href="#history" className="hover:text-blue-500 transition-colors">Geschichte</Link>
        <Link href="#tech" className="hover:text-blue-500 transition-colors">NFC Technik</Link>
      </div>

      <div className="flex items-center gap-4">
        <ModeToggle />
        <Link href="/login">
          <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-6 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
            Login
          </Button>
        </Link>
      </div>
    </motion.nav>
  );
}
