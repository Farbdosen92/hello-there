import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, RefreshCw } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/auth-context";

export default function LeadsPage() {
    const { user } = useAuth();
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLeads() {
            if (!user) return;

            const { data } = await supabase
                .from("leads")
                .select("*, users(name)")
                .eq("captured_by_user_id", user.id)
                .order("created_at", { ascending: false });

            setLeads(data || []);
            setLoading(false);
        }

        fetchLeads();
    }, [user]);

    const handleExportCSV = () => {
        const headers = "Name,Email,Sentiment,Date\n";
        const rows = leads.map((l) => `${l.lead_name},${l.lead_email},${l.sentiment},${l.created_at}`).join("\n");
        const blob = new Blob([headers + rows], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "leads_export.csv";
        link.click();
    };

    const handleCRMSync = () => {
        alert("Synchronisiere mit konfiguriertem CRM (Salesforce/HubSpot)...");
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Kontakte</h1>
                    <p className="text-zinc-500">Erfasste Kontakte aus dem Visitenkarten-Modus.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-white/10" onClick={handleExportCSV}>
                        <Download size={18} className="mr-2" /> CSV Exportieren
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-500 text-white" onClick={handleCRMSync}>
                        <RefreshCw size={18} className="mr-2" /> CRM Synchronisieren
                    </Button>
                </div>
            </div>

            <div className="rounded-md border border-white/5 bg-zinc-900/50">
                <Table>
                    <TableHeader>
                        <TableRow className="border-white/5 hover:bg-white/5">
                            <TableHead>Name</TableHead>
                            <TableHead>E-Mail</TableHead>
                            <TableHead>Stimmung</TableHead>
                            <TableHead>Erfasst von</TableHead>
                            <TableHead>Datum</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leads.map((lead) => (
                            <TableRow key={lead.id} className="border-white/5 hover:bg-white/5">
                                <TableCell className="font-medium text-white">{lead.lead_name}</TableCell>
                                <TableCell className="text-zinc-400">{lead.lead_email}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className={
                                            lead.sentiment === "hot"
                                                ? "border-green-500 text-green-400 bg-green-500/10"
                                                : lead.sentiment === "warm"
                                                    ? "border-yellow-500 text-yellow-400 bg-yellow-500/10"
                                                    : "border-red-500 text-red-400 bg-red-500/10"
                                        }
                                    >
                                        {lead.sentiment}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-zinc-400">{lead.users?.name || "-"}</TableCell>
                                <TableCell className="text-zinc-500">{new Date(lead.created_at).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                        {leads.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10 text-zinc-500">
                                    Noch keine Kontakte erfasst.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
