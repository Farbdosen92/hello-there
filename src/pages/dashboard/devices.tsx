import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, Edit, Trash, AlertTriangle } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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

export default function DevicesPage() {
    const { user } = useAuth();
    const [devices, setDevices] = useState<any[]>([]);
    const [companies, setCompanies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [addOpen, setAddOpen] = useState(false);
    const [addLoading, setAddLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function fetchDevices() {
        if (!user) return;

        // Get user's profile to check company
        const { data: userProfile } = await supabase
            .from("users")
            .select("id, company_id")
            .eq("id", user.id)
            .single();

        // Fetch chips
        let query = supabase.from("chips").select("*, assigned_user:users(name)");

        if (userProfile?.company_id) {
            query = query.eq("company_id", userProfile.company_id);
        } else {
            query = query.eq("assigned_user_id", user.id);
        }

        const { data } = await query;
        setDevices(data || []);

        // Fetch companies
        const { data: companiesData } = await supabase.from("companies").select("id, name");
        setCompanies(companiesData || []);

        setLoading(false);
    }

    useEffect(() => {
        fetchDevices();
    }, [user]);

    async function handleAddChip(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setAddLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const uid = formData.get("uid") as string;
        const company_id = formData.get("company_id") as string;

        const { error: insertError } = await supabase.from("chips").insert({
            uid,
            company_id: company_id || null,
            assigned_user_id: user?.id,
            active_mode: "corporate",
        });

        if (insertError) {
            setError(insertError.message);
        } else {
            setAddOpen(false);
            fetchDevices();
        }
        setAddLoading(false);
    }

    async function handleDeleteChip(chipId: string) {
        const { error } = await supabase.from("chips").delete().eq("id", chipId);
        if (!error) {
            fetchDevices();
        }
    }

    async function handleUpdateMode(chipId: string, newMode: string) {
        const { error } = await supabase.from("chips").update({ active_mode: newMode }).eq("id", chipId);
        if (!error) {
            fetchDevices();
        }
    }

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
                    <h1 className="text-3xl font-bold tracking-tight">Geräte</h1>
                    <p className="text-zinc-500">Verwalten Sie alle NFC-Chips und deren aktive Modi.</p>
                </div>

                <Dialog open={addOpen} onOpenChange={setAddOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-white text-black hover:bg-zinc-200">
                            <Plus size={18} className="mr-2" /> Chip hinzufügen
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
                        <DialogHeader>
                            <DialogTitle>Neuen NFC-Chip registrieren</DialogTitle>
                            <DialogDescription className="text-zinc-400">
                                Geben Sie die UID des NTAG424 DNA Chips ein.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleAddChip} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="uid">Chip UID (Hex)</Label>
                                <Input name="uid" placeholder="04:A1:B2:C3:D4:E5:F6" className="bg-black/50 border-white/10 font-mono" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="company_id">Firma zuweisen</Label>
                                <Select name="company_id">
                                    <SelectTrigger className="bg-black/50 border-white/10">
                                        <SelectValue placeholder="Firma wählen" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                        {companies.map((c) => (
                                            <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {error && <p className="text-red-400 text-sm">{error}</p>}

                            <div className="flex justify-end gap-2 pt-2">
                                <Button type="button" variant="ghost" onClick={() => setAddOpen(false)} disabled={addLoading}>
                                    Abbrechen
                                </Button>
                                <Button type="submit" className="bg-blue-600 hover:bg-blue-500" disabled={addLoading}>
                                    {addLoading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : "Chip erstellen"}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border border-white/5 bg-zinc-900/50">
                <Table>
                    <TableHeader>
                        <TableRow className="border-white/5 hover:bg-white/5">
                            <TableHead>UID</TableHead>
                            <TableHead>Zugewiesen an</TableHead>
                            <TableHead>Aktiver Modus</TableHead>
                            <TableHead>Letzter Scan</TableHead>
                            <TableHead className="text-right">Aktionen</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {devices.map((device) => (
                            <TableRow key={device.id} className="border-white/5 hover:bg-white/5">
                                <TableCell className="font-mono text-zinc-400">
                                    {device.uid ? `****${device.uid.slice(-4).toUpperCase()}` : "-"}
                                </TableCell>
                                <TableCell className="font-medium text-white">{device.assigned_user?.name || "-"}</TableCell>
                                <TableCell>
                                    <Select value={device.active_mode} onValueChange={(val) => handleUpdateMode(device.id, val)}>
                                        <SelectTrigger className="w-32 bg-transparent border-white/10">
                                            <Badge
                                                variant="outline"
                                                className={
                                                    device.active_mode === "corporate"
                                                        ? "border-blue-500 text-blue-400"
                                                        : device.active_mode === "hospitality"
                                                            ? "border-orange-500 text-orange-400"
                                                            : "border-purple-500 text-purple-400"
                                                }
                                            >
                                                {device.active_mode}
                                            </Badge>
                                        </SelectTrigger>
                                        <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                            <SelectItem value="corporate">Corporate</SelectItem>
                                            <SelectItem value="hospitality">Hospitality</SelectItem>
                                            <SelectItem value="event">Event</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell className="text-zinc-500">
                                    {device.last_scan ? new Date(device.last_scan).toLocaleDateString() : "Nie"}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-red-400 hover:text-red-300"
                                        onClick={() => handleDeleteChip(device.id)}
                                    >
                                        <Trash size={16} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}

                        {devices.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10 text-zinc-500">
                                    Keine Geräte gefunden. Fügen Sie eines hinzu.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
