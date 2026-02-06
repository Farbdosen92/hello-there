import { useParams } from "react-router-dom";

export default function CampaignPage() {
    const { companyId } = useParams<{ companyId: string }>();

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
            <div className="text-center max-w-md">
                <h1 className="text-3xl font-bold mb-4">Campaign</h1>
                <p className="text-zinc-400">Campaign page for company: {companyId}</p>
                <p className="text-zinc-600 text-sm mt-4">Coming soon...</p>
            </div>
        </div>
    );
}
