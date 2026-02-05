export default function NfcLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans antialiased">
            <div className="mx-auto max-w-md min-h-screen bg-black shadow-2xl relative">
                {children}
            </div>
        </div>
    );
}
