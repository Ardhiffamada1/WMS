import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";

export default async function DashboardLayout({ children }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    profile = data || {
      full_name:
        user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
      role: user.user_metadata?.role || "STAFF",
    };
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex">
      {/* Sidebar lebih lebar: pl-72 menyesuaikanSidebar w-72 */}
      <Sidebar />
      <div className="flex-1 pl-72 flex flex-col min-w-0 transition-all">
        <Navbar profile={profile} />
        {/* Main Content: Padding lebih besar dan Container diperluas hingga 1600px */}
        <main className="flex-1 p-8 lg:p-10 max-w-[1600px] w-full mx-auto overflow-x-hidden bg-white dark:bg-zinc-950">
          {children}
        </main>
      </div>
    </div>
  );
}
