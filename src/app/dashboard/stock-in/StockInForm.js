"use client";

import { useState } from "react";
import { processStockInAction } from "@/lib/actions/stockActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function StockInForm({ products, suppliers }) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    const formData = new FormData(e.target);
    const res = await processStockInAction(formData);

    if (res?.error) {
      setMsg({ type: "error", text: res.error });
    } else {
      setMsg({ type: "success", text: "Stock In berhasil diproses!" });
      e.target.reset();
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {msg && (
        <div
          className={`p-3 text-xs rounded-lg border ${
            msg.type === "error"
              ? "border-rose-500/20 bg-rose-500/10 text-rose-500"
              : "border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
          }`}
        >
          {msg.text}
        </div>
      )}

      <div className="space-y-1.5">
        <Label
          htmlFor="product_id"
          className="text-xs text-zinc-500 font-medium"
        >
          Pilih Produk SKU
        </Label>
        <select
          id="product_id"
          name="product_id"
          required
          className="w-full h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 px-3 text-sm text-zinc-900 dark:text-zinc-100 focus:border-zinc-400 dark:focus:border-zinc-600 focus:outline-none transition-colors"
        >
          <option
            value=""
            className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
          >
            -- Select Product --
          </option>
          {products.map((p) => (
            <option
              key={p.id}
              value={p.id}
              className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
            >
              {p.sku} - {p.name} (Current Stock: {p.stock})
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <Label
          htmlFor="supplier_id"
          className="text-xs text-zinc-500 font-medium"
        >
          Pilih Supplier (Opsional)
        </Label>
        <select
          id="supplier_id"
          name="supplier_id"
          className="w-full h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 px-3 text-sm text-zinc-900 dark:text-zinc-100 focus:border-zinc-400 dark:focus:border-zinc-600 focus:outline-none transition-colors"
        >
          <option
            value=""
            className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
          >
            -- Direct Supplier / None --
          </option>
          {suppliers.map((s) => (
            <option
              key={s.id}
              value={s.id}
              className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
            >
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="quantity" className="text-xs text-zinc-500 font-medium">
          Jumlah Kuantitas Masuk
        </Label>
        <Input
          id="quantity"
          name="quantity"
          type="number"
          min="1"
          required
          placeholder="0"
          className="h-10 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:border-zinc-400 dark:focus:border-zinc-600 focus:outline-none transition-colors"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="notes" className="text-xs text-zinc-500 font-medium">
          Catatan Transaksi
        </Label>
        <Input
          id="notes"
          name="notes"
          placeholder="Contoh: DO-88219 dari supplier"
          className="h-10 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:border-zinc-400 dark:focus:border-zinc-600 focus:outline-none transition-colors"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full h-10 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-xs font-semibold rounded-xl cursor-pointer transition-colors mt-2"
      >
        {loading ? "Processing..." : "Submit Inbound Stock"}
      </Button>
    </form>
  );
}
