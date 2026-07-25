"use client";

import { useState } from "react";
import { processStockOutAction } from "@/lib/actions/stockActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function StockOutForm({ products }) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    const formData = new FormData(e.target);
    const res = await processStockOutAction(formData);

    if (res?.error) {
      setMsg({ type: "error", text: res.error });
    } else {
      setMsg({
        type: "success",
        text: "Pengeluaran barang berhasil diproses!",
      });
      e.target.reset();
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {msg && (
        <div
          className={`p-3 text-xs rounded-lg border ${msg.type === "error" ? "border-rose-500/20 bg-rose-500/10 text-rose-500" : "border-emerald-500/20 bg-emerald-500/10 text-emerald-500"}`}
        >
          {msg.text}
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="product_id" className="text-xs text-zinc-500">
          Pilih Produk SKU
        </Label>
        <select
          id="product_id"
          name="product_id"
          required
          className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-2.5 text-sm text-zinc-900 dark:text-zinc-100"
        >
          <option value="">-- Select Product --</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.sku} - {p.name} (Tersedia: {p.stock} {p.unit})
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="quantity" className="text-xs text-zinc-500">
          Jumlah Kuantitas Keluar
        </Label>
        <Input
          id="quantity"
          name="quantity"
          type="number"
          min="1"
          required
          placeholder="0"
          className="h-10 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="notes" className="text-xs text-zinc-500">
          Catatan Outbound / No SJ
        </Label>
        <Input
          id="notes"
          name="notes"
          placeholder="Contoh: Pengiriman ke Cabang / Sales Order #1029"
          className="h-10 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full h-10 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-950 text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
      >
        {loading ? "Processing..." : "Submit Outbound Stock"}
      </Button>
    </form>
  );
}
