import { createClient } from "@/lib/supabase/server";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Package, AlertTriangle, ArrowDownLeft, Layers } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();

  const [{ count: totalProducts }, { data: products }, { data: transactions }] =
    await Promise.all([
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("products").select("*"),
      supabase
        .from("transactions")
        .select("*, products(name, sku)")
        .order("created_at", { ascending: false })
        .limit(6),
    ]);

  const totalStock = products?.reduce((acc, curr) => acc + curr.stock, 0) || 0;
  const lowStockProducts =
    products?.filter((p) => p.stock <= p.minimum_stock) || [];

  return (
    <div className="space-y-8">
      {/* Header Halaman */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 pb-5">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Executive Dashboard
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Monitoring pergerakan barang dan kesehatan stok gudang secara
            realtime
          </p>
        </div>
      </div>

      {/* Cards Metrics - Padding & Text Ditingkatkan */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 p-5 transition-all">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Total SKU Catalog
            </span>
            <Package className="h-5 w-5" />
          </div>
          <p className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-3 font-mono">
            {totalProducts || 0}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 p-5 transition-all">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Total Quantity Stock
            </span>
            <Layers className="h-5 w-5" />
          </div>
          <p className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-3 font-mono">
            {totalStock.toLocaleString()}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 p-5 transition-all">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Stok Kritis
            </span>
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </div>
          <p className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-3 font-mono">
            {lowStockProducts.length}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 p-5 transition-all">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Mutasi Terakhir
            </span>
            <ArrowDownLeft className="h-5 w-5" />
          </div>
          <p className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-3 font-mono">
            {transactions?.length || 0}
          </p>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 p-6">
          <h2 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-4">
            Histori Mutasi Terbaru
          </h2>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-200 dark:border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400 text-xs py-3">
                  Kode
                </TableHead>
                <TableHead className="text-zinc-400 text-xs py-3">
                  Produk
                </TableHead>
                <TableHead className="text-zinc-400 text-xs py-3">
                  Tipe
                </TableHead>
                <TableHead className="text-zinc-400 text-xs py-3 text-right">
                  Jumlah
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-sm text-zinc-500 py-8"
                  >
                    Belum ada transaksi recorded
                  </TableCell>
                </TableRow>
              ) : (
                transactions?.map((tx) => (
                  <TableRow
                    key={tx.id}
                    className="border-zinc-200/60 dark:border-zinc-800/50"
                  >
                    <TableCell className="font-mono text-sm text-zinc-500 py-3.5">
                      {tx.code}
                    </TableCell>
                    <TableCell className="text-sm font-medium text-zinc-900 dark:text-zinc-200 py-3.5">
                      {tx.products?.name}
                    </TableCell>
                    <TableCell className="text-xs py-3.5">
                      <span className="inline-block rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 font-mono text-xs text-zinc-700 dark:text-zinc-300">
                        {tx.type}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-right font-mono font-bold text-zinc-900 dark:text-zinc-100 py-3.5">
                      {tx.quantity}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 p-6">
          <h2 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-4">
            Produk Perlu Restock
          </h2>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-200 dark:border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400 text-xs py-3">
                  SKU
                </TableHead>
                <TableHead className="text-zinc-400 text-xs py-3">
                  Produk
                </TableHead>
                <TableHead className="text-zinc-400 text-xs py-3">
                  Lokasi
                </TableHead>
                <TableHead className="text-zinc-400 text-xs py-3 text-right">
                  Sisa Stok
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lowStockProducts.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-sm text-zinc-500 py-8"
                  >
                    Semua stok produk dalam kondisi aman
                  </TableCell>
                </TableRow>
              ) : (
                lowStockProducts.map((p) => (
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
                      {p.location}
                    </TableCell>
                    <TableCell className="text-sm text-right font-mono font-bold text-amber-500 py-3.5">
                      {p.stock} {p.unit}
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
