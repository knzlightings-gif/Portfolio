import Sidebar from "@/components/admin/Sidebar";

// Force dynamic rendering — admin pages use cookies and Firebase Auth
export const dynamic = "force-dynamic";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-brand-bg flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
