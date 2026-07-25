import { createClient } from "@/lib/supabase/server";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ShieldCheck, User } from "lucide-react";

export default async function UsersPage() {
  const supabase = await createClient();

  // Ambil daftar profil staff
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div className="border-b border-zinc-200 dark:border-zinc-800/80 pb-5">
        <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          User & Authority Management
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Daftar otoritas pengguna dan hak akses sistem gudang
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 p-6">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-200 dark:border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-400 text-xs py-3">
                Nama Lengkap
              </TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">
                User ID
              </TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">
                Otoritas / Role
              </TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">
                Tanggal Terdaftar
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profiles?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-sm text-zinc-500 py-8"
                >
                  Belum ada user terdaftar
                </TableCell>
              </TableRow>
            ) : (
              profiles?.map((usr) => (
                <TableRow
                  key={usr.id}
                  className="border-zinc-200/60 dark:border-zinc-800/50"
                >
                  <TableCell className="text-sm font-semibold text-zinc-900 dark:text-zinc-200 py-3.5 flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-xs font-bold">
                      {usr.full_name
                        ? usr.full_name.charAt(0).toUpperCase()
                        : "U"}
                    </div>
                    {usr.full_name || "System Staff"}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-zinc-500 py-3.5">
                    {usr.user_id || usr.id}
                  </TableCell>
                  <TableCell className="text-xs py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-xs font-semibold ${
                        usr.role === "ADMIN"
                          ? "border-purple-500/20 bg-purple-500/10 text-purple-500"
                          : usr.role === "MANAGER"
                            ? "border-blue-500/20 bg-blue-500/10 text-blue-500"
                            : "border-zinc-500/20 bg-zinc-500/10 text-zinc-500"
                      }`}
                    >
                      {usr.role === "ADMIN" && (
                        <ShieldCheck className="h-3 w-3" />
                      )}
                      {usr.role || "STAFF"}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-zinc-500 py-3.5">
                    {new Date(usr.created_at).toLocaleDateString("id-ID")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
