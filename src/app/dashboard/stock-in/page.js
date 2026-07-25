import { createClient } from "@/lib/supabase/server";
import StockInForm from "./StockInForm";

export default async function StockInPage() {
  const supabase = await createClient();

  const [{ data: products }, { data: suppliers }] = await Promise.all([
    supabase.from("products").select("id, name, sku, stock, unit"),
    supabase.from("suppliers").select("id, name"),
  ]);

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="border-b border-zinc-200 dark:border-zinc-800/80 pb-5">
        <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Stock Inbound
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Penerimaan barang dari supplier untuk menambah persediaan stok gudang
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 p-6">
        <h2 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-4">
          Form Barang Masuk
        </h2>
        <StockInForm products={products || []} suppliers={suppliers || []} />
      </div>
    </div>
  );
}
