import { AdminSidebar } from "@/components/dashboard/sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans antialiased pl-64">
            <AdminSidebar />
            <main className="p-8">
                {children}
            </main>
        </div>
    );
}
