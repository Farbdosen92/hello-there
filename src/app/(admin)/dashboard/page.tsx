import { Card } from "@/components/ui/card";
import { Users, ScanLine, ArrowUpRight, DollarSign } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
    const supabase = await createClient();

    // Parallel data fetching
    const [
        { count: scansCount },
        { count: leadsCount },
        { count: chipsCount }
    ] = await Promise.all([
        supabase.from("scans").select("*", { count: "exact", head: true }),
        supabase.from("leads").select("*", { count: "exact", head: true }),
        supabase.from("chips").select("*", { count: "exact", head: true })
    ]);

    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm text-zinc-400">System Online</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title="Total Scans"
                    value={scansCount || 0}
                    change="All time"
                    icon={ScanLine}
                />
                <StatsCard
                    title="Active Leads"
                    value={leadsCount || 0}
                    change="Captured contacts"
                    icon={Users}
                />
                <StatsCard
                    title="Active Chips"
                    value={chipsCount || 0}
                    change="Deployed devices"
                    icon={ArrowUpRight}
                />
                <StatsCard
                    title="Revenue"
                    value="$0"
                    change="Placeholder"
                    icon={DollarSign}
                />
            </div>

            {/* ... Charts Placeholder (kept as is) ... */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-zinc-900 border-white/5 p-6 h-[400px]">
                    <h3 className="font-semibold mb-4">Live Scan Feed</h3>
                    <div className="text-zinc-500 text-sm">Realtime feed coming soon (Requires Supabase Realtime).</div>
                </Card>

                <Card className="bg-zinc-900 border-white/5 p-6 h-[400px] flex items-center justify-center">
                    <p className="text-zinc-500">Analytics Chart Prototype</p>
                </Card>
            </div>

        </div>
    );
}

function StatsCard({ title, value, change, icon: Icon }: any) {
    return (
        <Card className="bg-zinc-900 border-white/5 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-zinc-400">{title}</p>
                    <h2 className="text-2xl font-bold mt-2">{value}</h2>
                </div>
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400">
                    <Icon size={20} />
                </div>
            </div>
            <p className="text-xs text-zinc-500 mt-4">{change}</p>
        </Card>
    )
}
