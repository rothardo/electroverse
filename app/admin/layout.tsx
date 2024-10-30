import { Metadata } from "next";
import AdminSidebar from "@/components/admin/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin",
};

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="w-full p-8">
        <h1 className="w-full block text-gray-300 text-2xl font-light pb-4 mb-2 border-b border-gray-400">Page Name</h1>
        {children}
      </div>
    </div>

  );
};

export default AdminLayout;
