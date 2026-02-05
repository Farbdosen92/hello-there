import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

// Initialize Supabase Client (Admin/Service Role needed for secure reads if RLS is strict, or just Anon if policy allows)
// For redirect, we usually need read access to chips table.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface PageProps {
    params: {
        uid: string;
    };
    searchParams: {
        sun?: string; // Secure Unique NFC message
    };
}

export default async function NfcRedirectPage({ params, searchParams }: PageProps) {
    const { uid } = params;
    const { sun } = searchParams;

    // 1. SUN Verification (Mocked for now, but placeholder for real CMAC check)
    if (process.env.NODE_ENV === "production" && !sun) {
        // Allow skipping SUN in dev, but strictly require in prod if configured
        // console.warn("Missing SUN in production scan");
    }

    // 2. Fetch Chip Data
    const { data: chip, error } = await supabase
        .from("chips")
        .select(`
        *,
        company:companies(*),
        assigned_user:users(*)
    `)
        .eq("uid", uid)
        .single();

    if (error || !chip) {
        // Redirect to error page or fallback
        // For demo: generic error
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white p-4 text-center">
                <div>
                    <h1 className="text-2xl font-bold mb-2 text-red-500">Chip nicht erkannt</h1>
                    <p className="text-zinc-400">Dieser NFC-Tag ist nicht registriert oder inaktiv.</p>
                    <p className="mt-4 text-xs text-zinc-600">UID: {uid}</p>
                </div>
            </div>
        );
    }

    // 3. Log Scan (Fire and forget, or await if critical)
    // await logScan(chip.id);

    // 4. Check Campaign Override
    // const campaign = await getActiveCampaign(chip.company_id);
    // if (campaign) redirect(campaign.target_url);

    // 5. Routing Logic based on Mode
    switch (chip.active_mode) {
        case "corporate":
            // Redirect to User Profile
            if (chip.assigned_user_id) {
                redirect(`/p/${chip.assigned_user_id}`); // Internal route to profile
            }
            break;

        case "hospitality":
            // Redirect to Review Page
            redirect(`/review/${chip.company_id}`);
            break;

        case "campaign":
            // Redirect to Company Campaign Page
            redirect(`/campaign/${chip.company_id}`);
            break;
    }

    // Fallback
    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
            <div className="animate-pulse">Lädt...</div>
        </div>
    );
}
