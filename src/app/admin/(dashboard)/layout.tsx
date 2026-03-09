import { AdminSidebar } from "@/components/ui/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-10 w-full lg:max-w-[calc(100vw-288px)]">
        {children}
      </main>
    </div>
  );
}
