import { createClient } from "@/lib/supabase/server";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default async function TransactionsPage() {
  const supabase = await createClient();

  const { data: transactions } = await supabase
    .from("transactions")
    .select("*, products(name, sku), suppliers(name)")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div className="border-b border-zinc-200 dark:border-zinc-800/80 pb-5">
        <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Audit Log Transaksi
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Histori immutable mutasi barang masuk dan keluar gudang
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 p-6">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-200 dark:border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-400 text-xs py-3">
                Kode Transaksi
              </TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">
                Waktu & Tanggal
              </TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">
                SKU & Nama Produk
              </TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">
                Tipe Mutasi
              </TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">
                Supplier / Partner
              </TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">
                Catatan
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
                  colSpan={7}
                  className="text-center text-sm text-zinc-500 py-8"
                >
                  Belum ada catatan mutasi
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
                  <TableCell className="text-xs text-zinc-500 py-3.5">
                    {new Date(tx.created_at).toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-zinc-900 dark:text-zinc-200 py-3.5">
                    <div>{tx.products?.name}</div>
                    <div className="text-[10px] font-mono text-zinc-400">
                      {tx.products?.sku}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs py-3.5">
                    <span
                      className={`inline-block rounded-md border px-2 py-0.5 font-mono text-xs ${
                        tx.type === "STOCK_IN"
                          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
                          : "border-rose-500/20 bg-rose-500/10 text-rose-500"
                      }`}
                    >
                      {tx.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-zinc-500 py-3.5">
                    {tx.suppliers?.name || "-"}
                  </TableCell>
                  <TableCell className="text-sm text-zinc-500 py-3.5">
                    {tx.notes || "-"}
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
    </div>
  );
}
