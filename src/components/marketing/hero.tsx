"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 backdrop-blur-md text-sm text-yellow-200 inline-flex items-center gap-2 mb-8">
                        <Sparkles size={14} className="text-yellow-400" />
                        Sonderpreis U21 Gewinner 2025 🏆
                    </span>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8">
                        Kleidung, die <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-white animate-gradient">
                            verbindet.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Verwandle Mitarbeiter in Markenbotschafter. NFCwear integriert unsichtbare Technologie in hochwertige Textilien für intelligentes Networking und Lead-Erfassung.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <Button size="lg" className="h-14 px-8 rounded-full bg-white text-black hover:bg-zinc-200 text-base font-semibold">
                            Demo buchen
                        </Button>
                        <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white">
                            Mehr erfahren <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
