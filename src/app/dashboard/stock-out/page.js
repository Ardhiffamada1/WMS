import { createClient } from "@/lib/supabase/server";
import StockOutForm from "./StockOutForm";

export default async function StockOutPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("id, name, sku, stock, unit");

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="border-b border-zinc-200 dark:border-zinc-800/80 pb-5">
        <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Stock Outbound
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Pengurangan stok untuk alokasi pengiriman atau penjualan
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 p-6">
        <StockOutForm products={products || []} />
      </div>
    </div>
  );
}
