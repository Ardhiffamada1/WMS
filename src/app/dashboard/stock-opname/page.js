import { createClient } from "@/lib/supabase/server";
import OpnameForm from "./OpnameForm";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default async function StockOpnamePage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("id, name, sku, stock, unit, location");

  return (
    <div className="space-y-8">
      <div className="border-b border-zinc-200 dark:border-zinc-800/80 pb-5">
        <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Stock Opname & Adjustment
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Penyesuaian stok perhitungan fisik rak gudang dengan database sistem
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Form Penyesuaian */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 p-6 h-fit">
          <h2 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-4">
            Input Hasil Opname Fisik
          </h2>
          <OpnameForm products={products || []} />
        </div>

        {/* Tabel Referensi Stok Sistem */}
        <div className="lg:col-span-2 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 p-6">
          <h2 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-4">
            Stok Terdaftar Saat Ini
          </h2>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-200 dark:border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400 text-xs py-3">
                  SKU
                </TableHead>
                <TableHead className="text-zinc-400 text-xs py-3">
                  Nama Produk
                </TableHead>
                <TableHead className="text-zinc-400 text-xs py-3">
                  Lokasi
                </TableHead>
                <TableHead className="text-zinc-400 text-xs py-3 text-right">
                  Stok Sistem
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((p) => (
                <TableRow
                  key={p.id}
                  className="border-zinc-200/60 dark:border-zinc-800/50"
                >
                  <TableCell className="font-mono text-sm text-zinc-500 py-3">
                    {p.sku}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-zinc-900 dark:text-zinc-200 py-3">
                    {p.name}
                  </TableCell>
                  <TableCell className="text-sm font-mono text-zinc-500 py-3">
                    {p.location}
                  </TableCell>
                  <TableCell className="text-sm text-right font-mono font-bold text-zinc-900 dark:text-zinc-100 py-3">
                    {p.stock} {p.unit}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
