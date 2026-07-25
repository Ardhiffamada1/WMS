import { createClient } from "@/lib/supabase/server";
import {
  createCategoryAction,
  deleteCategoryAction,
} from "@/lib/actions/categoryActions";
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
import { Trash2, Tags } from "lucide-react";

export default async function CategoriesPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div className="border-b border-zinc-200 dark:border-zinc-800/80 pb-5">
        <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Category Management
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Kelola pengelompokan jenis barang/material gudang
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Form Tambah Kategori */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 p-6 h-fit">
          <h2 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Tags className="h-4 w-4" /> Tambah Kategori
          </h2>
          <form action={createCategoryAction} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs text-zinc-500">
                Nama Kategori
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="contoh: Electronics, Sparepart..."
                required
                className="h-9 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="description" className="text-xs text-zinc-500">
                Deskripsi
              </Label>
              <Input
                id="description"
                name="description"
                placeholder="Keterangan singkat..."
                className="h-9 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-9 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-950 text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              Simpan Kategori
            </Button>
          </form>
        </div>

        {/* Tabel Data Kategori */}
        <div className="lg:col-span-2 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 p-6">
          <h2 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-4">
            Daftar Kategori Aktif
          </h2>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-200 dark:border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400 text-xs py-3">
                  Nama Kategori
                </TableHead>
                <TableHead className="text-zinc-400 text-xs py-3">
                  Deskripsi
                </TableHead>
                <TableHead className="text-zinc-400 text-xs py-3 text-right">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-sm text-zinc-500 py-8"
                  >
                    Belum ada kategori terdaftar
                  </TableCell>
                </TableRow>
              ) : (
                categories?.map((cat) => (
                  <TableRow
                    key={cat.id}
                    className="border-zinc-200/60 dark:border-zinc-800/50"
                  >
                    <TableCell className="text-sm font-semibold text-zinc-900 dark:text-zinc-200 py-3.5">
                      {cat.name}
                    </TableCell>
                    <TableCell className="text-sm text-zinc-500 py-3.5">
                      {cat.description || "-"}
                    </TableCell>
                    <TableCell className="text-right py-3.5">
                      <form action={deleteCategoryAction.bind(null, cat.id)}>
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
