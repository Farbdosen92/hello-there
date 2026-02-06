import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function MarketingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20" />
                <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:py-40">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                            <span className="block text-white">NFCwear</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                by Severmore
                            </span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-zinc-400 max-w-2xl mx-auto">
                            Die nächste Generation digitaler Visitenkarten. Tippen Sie einfach Ihr Wearable an jedes Smartphone und
                            teilen Sie Ihre Kontaktdaten sofort.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-4">
                            <Link to="/login">
                                <Button size="lg" className="bg-white text-black hover:bg-zinc-200">
                                    Dashboard öffnen
                                </Button>
                            </Link>
                            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                                Mehr erfahren
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-24 bg-zinc-950">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white">Warum NFCwear?</h2>
                        <p className="mt-4 text-zinc-400">Moderne Technologie trifft auf elegantes Design</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Sofort teilen",
                                description: "Ein Tippen genügt. Keine App erforderlich.",
                                icon: "⚡",
                            },
                            {
                                title: "Vollständig anpassbar",
                                description: "Passen Sie Ihr Profil, Links und Aktionen an.",
                                icon: "🎨",
                            },
                            {
                                title: "Analytics inklusive",
                                description: "Verfolgen Sie Scans, Leads und Conversions in Echtzeit.",
                                icon: "📊",
                            },
                        ].map((feature) => (
                            <div key={feature.title} className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                                <p className="text-zinc-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-24 bg-gradient-to-b from-zinc-950 to-black">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Bereit loszulegen?</h2>
                    <p className="text-zinc-400 mb-10">
                        Kontaktieren Sie uns für eine Demo oder starten Sie direkt mit Ihrem eigenen NFCwear.
                    </p>
                    <Link to="/login">
                        <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90">
                            Jetzt starten
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-8 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 text-center text-zinc-500 text-sm">
                    © 2026 Severmore. Alle Rechte vorbehalten.
                </div>
            </footer>
        </div>
    );
}
