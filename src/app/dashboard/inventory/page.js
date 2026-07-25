import { createClient } from "@/lib/supabase/server";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Layers, AlertTriangle, CheckCircle } from "lucide-react";

export default async function InventoryPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*, categories(name)")
    .order("stock", { ascending: true });

  return (
    <div className="space-y-8">
      <div className="border-b border-zinc-200 dark:border-zinc-800/80 pb-5">
        <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Stock Inventory Monitor
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Status ketersediaan kuantitas dan lokasi penyimpan rak fisik
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 p-6">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-200 dark:border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-400 text-xs py-3">SKU</TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">
                Nama Produk
              </TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">
                Kategori
              </TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">
                Lokasi Rak
              </TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">
                Status Stock
              </TableHead>
              <TableHead className="text-zinc-400 text-xs py-3 text-right">
                Jumlah Stok
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((p) => {
              const isLowStock = p.stock <= p.minimum_stock;
              return (
                <TableRow
                  key={p.id}
                  className="border-zinc-200/60 dark:border-zinc-800/50"
                >
                  <TableCell className="font-mono text-sm text-zinc-500 py-3.5">
                    {p.sku}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-zinc-900 dark:text-zinc-200 py-3.5">
                    {p.name}
                  </TableCell>
                  <TableCell className="text-sm text-zinc-500 py-3.5">
                    {p.categories?.name || "-"}
                  </TableCell>
                  <TableCell className="text-sm font-mono text-zinc-500 py-3.5">
                    {p.location}
                  </TableCell>
                  <TableCell className="text-xs py-3.5">
                    {isLowStock ? (
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-500">
                        <AlertTriangle className="h-3 w-3" /> Restock Required
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-500">
                        <CheckCircle className="h-3 w-3" /> Safe Level
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-right font-mono font-bold text-zinc-900 dark:text-zinc-100 py-3.5">
                    {p.stock} {p.unit}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
