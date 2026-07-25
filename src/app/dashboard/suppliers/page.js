import { createClient } from "@/lib/supabase/server";
import {
  createSupplierAction,
  deleteSupplierAction,
} from "@/lib/actions/supplierActions";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Users } from "lucide-react";

export default async function SuppliersPage() {
  const supabase = await createClient();
  const { data: suppliers } = await supabase
    .from("suppliers")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div className="border-b border-zinc-200 dark:border-zinc-800/80 pb-5">
        <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Supplier Directory
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Direktori penyedia dan mitra pasokan material
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Form Add Supplier */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 p-6 h-fit">
          <h2 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Users className="h-4 w-4" /> Registrasi Supplier
          </h2>
          <form action={createSupplierAction} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs text-zinc-500">
                Nama Perusahaan / Supplier
              </Label>
              <Input
                id="name"
                name="name"
                required
                placeholder="PT. Andalan Utama"
                className="h-9 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs text-zinc-500">
                No. Telepon / WhatsApp
              </Label>
              <Input
                id="phone"
                name="phone"
                placeholder="081234567890"
                className="h-9 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs text-zinc-500">
                Email Contact
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="contact@supplier.com"
                className="h-9 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="address" className="text-xs text-zinc-500">
                Alamat Lengkap
              </Label>
              <Input
                id="address"
                name="address"
                placeholder="Semarang, Jawa Tengah"
                className="h-9 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-9 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-950 text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              Simpan Data Supplier
            </Button>
          </form>
        </div>

        {/* Tabel Supplier */}
        <div className="lg:col-span-2 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 p-6">
          <h2 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-4">
            Daftar Supplier Terverifikasi
          </h2>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-200 dark:border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400 text-xs py-3">
                  Perusahaan
                </TableHead>
                <TableHead className="text-zinc-400 text-xs py-3">
                  Kontak
                </TableHead>
                <TableHead className="text-zinc-400 text-xs py-3">
                  Alamat
                </TableHead>
                <TableHead className="text-zinc-400 text-xs py-3 text-right">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-sm text-zinc-500 py-8"
                  >
                    Belum ada supplier terdaftar
                  </TableCell>
                </TableRow>
              ) : (
                suppliers?.map((sup) => (
                  <TableRow
                    key={sup.id}
                    className="border-zinc-200/60 dark:border-zinc-800/50"
                  >
                    <TableCell className="text-sm font-semibold text-zinc-900 dark:text-zinc-200 py-3.5">
                      {sup.name}
                    </TableCell>
                    <TableCell className="text-xs text-zinc-500 py-3.5">
                      <div>{sup.phone || "-"}</div>
                      <div className="text-[10px] text-zinc-400">
                        {sup.email}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-zinc-500 py-3.5">
                      {sup.address || "-"}
                    </TableCell>
                    <TableCell className="text-right py-3.5">
                      <form action={deleteSupplierAction.bind(null, sup.id)}>
                        <Button
                          variant="ghost"
                          size="sm"
                          type="submit"
                          className="h-8 w-8 p-0 text-zinc-400 hover:text-rose-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </form>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
