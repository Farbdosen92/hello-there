"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Mic, Send, ThumbsUp, ThumbsDown, Meh, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function ConnectForm({ ownerName }: { ownerName: string }) {
    const [step, setStep] = useState<"visitor_form" | "owner_feedback">("visitor_form");
    const [isRecording, setIsRecording] = useState(false);
    const [sentiment, setSentiment] = useState<"hot" | "warm" | "cold" | null>(null);

    const handleVisitorSubmit = () => {
        // Simulate API call
        setTimeout(() => {
            setStep("owner_feedback");
        }, 500);
    };

    const handleOwnerSubmit = () => {
        // Finish
        // Close dialog (in real app, use callback)
        alert("Lead saved with Sentiment & Voice Note!");
    };

    if (step === "visitor_form") {
        return (
            <>
                <DialogHeader>
                    <DialogTitle>Let&apos;s Connect!</DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Teile deine Kontaktdaten direkt mit {ownerName}.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <Input placeholder="Dein Name" className="bg-black/50 border-white/10" />
                    <Input placeholder="Deine E-Mail" className="bg-black/50 border-white/10" />
                    <Input placeholder="LinkedIn URL (optional)" className="bg-black/50 border-white/10" />
                    <Textarea placeholder="Nachricht..." className="bg-black/50 border-white/10" />
                    <Button className="w-full bg-blue-600 hover:bg-blue-500" onClick={handleVisitorSubmit}>Senden</Button>
                </div>
            </>
        );
    }

    // Simulated "Owner View" that appears after a lead is captured (Simulating Push Notification open)
    return (
        <>
            <DialogHeader>
                <DialogTitle className="text-orange-400">⚡ New Lead Captured!</DialogTitle>
                <DialogDescription className="text-zinc-400">
                    (Simulation: Owner received push notification)
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">

                <div className="space-y-2">
                    <p className="text-sm font-medium text-white">How was the vibe?</p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            className={cn("flex-1 border-white/10 hover:bg-red-500/20 hover:text-red-400", sentiment === 'cold' && "bg-red-500/20 text-red-400 border-red-500")}
                            onClick={() => setSentiment("cold")}
                        >
                            <ThumbsDown size={18} className="mr-2" /> Cold
                        </Button>
                        <Button
                            variant="outline"
                            className={cn("flex-1 border-white/10 hover:bg-yellow-500/20 hover:text-yellow-400", sentiment === 'warm' && "bg-yellow-500/20 text-yellow-400 border-yellow-500")}
                            onClick={() => setSentiment("warm")}
                        >
                            <Meh size={18} className="mr-2" /> Warm
                        </Button>
                        <Button
                            variant="outline"
                            className={cn("flex-1 border-white/10 hover:bg-green-500/20 hover:text-green-400", sentiment === 'hot' && "bg-green-500/20 text-green-400 border-green-500")}
                            onClick={() => setSentiment("hot")}
                        >
                            <ThumbsUp size={18} className="mr-2" /> Hot
                        </Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-sm font-medium text-white">Quick Voice Note</p>
                    <div
                        className={cn(
                            "h-16 rounded-xl border border-dashed border-white/20 flex items-center justify-center cursor-pointer transition-all",
                            isRecording ? "bg-red-500/10 border-red-500 animate-pulse" : "hover:bg-white/5"
                        )}
                        onClick={() => setIsRecording(!isRecording)}
                    >
                        {isRecording ? (
                            <span className="text-red-400 flex items-center gap-2 text-sm font-bold">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" /> Recording... (Tap to stop)
                            </span>
                        ) : (
                            <span className="text-zinc-500 flex items-center gap-2 text-sm">
                                <Mic size={18} /> Tap to record context
                            </span>
                        )}
                    </div>
                </div>

                <Button className="w-full bg-white text-black hover:bg-zinc-200" onClick={handleOwnerSubmit}>
                    <Check size={18} className="mr-2" /> Save Context
                </Button>
            </div>
        </>
    )
}
